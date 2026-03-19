import { useEffect, useMemo, useState } from 'react';

const BAR_COUNT = 32;
const MIN_VALUE = 8;
const MAX_VALUE = 95;
const GRID_ROWS = 11;
const GRID_COLS = 20;

const randomArray = (count = BAR_COUNT) =>
  Array.from(
    { length: count },
    () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  );

const createSortStep = (array, options = {}) => ({
  array: [...array],
  active: options.active || [],
  swapped: options.swapped || [],
  sorted: options.sorted || [],
  pivot: options.pivot ?? null,
  phase: options.phase || 'idle'
});

const keyFor = (row, col) => `${row}-${col}`;
const parseKey = (key) => key.split('-').map(Number);
const manhattan = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const createGrid = () => {
  const start = { row: 1, col: 1 };
  const end = { row: GRID_ROWS - 2, col: GRID_COLS - 2 };
  const walls = new Set();

  for (let r = 0; r < GRID_ROWS; r += 1) {
    for (let c = 0; c < GRID_COLS; c += 1) {
      if ((r === start.row && c === start.col) || (r === end.row && c === end.col)) continue;
      if (Math.random() < 0.2) walls.add(keyFor(r, c));
    }
  }

  return { start, end, walls };
};

const neighborsOf = (row, col) =>
  [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1]
  ].filter(([r, c]) => r >= 0 && c >= 0 && r < GRID_ROWS && c < GRID_COLS);

const buildBubbleSteps = (input) => {
  const arr = [...input];
  const steps = [createSortStep(arr)];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      steps.push(createSortStep(arr, { active: [j, j + 1], phase: 'compare' }));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push(createSortStep(arr, { swapped: [j, j + 1], phase: 'swap' }));
      }
    }
    const sorted = Array.from({ length: i + 1 }, (_, k) => arr.length - 1 - k);
    steps.push(createSortStep(arr, { sorted, phase: 'mark' }));
  }

  steps.push(
    createSortStep(arr, {
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      phase: 'done'
    })
  );
  return steps;
};

const buildQuickSteps = (input) => {
  const arr = [...input];
  const steps = [createSortStep(arr)];
  const sortedSet = new Set();
  const push = (options = {}) =>
    steps.push(
      createSortStep(arr, {
        ...options,
        sorted: options.sorted || [...sortedSet]
      })
    );

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j += 1) {
      push({ active: [j, high], pivot: high, phase: 'compare' });
      if (arr[j] < pivot) {
        i += 1;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          push({ swapped: [i, j], pivot: high, phase: 'swap' });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    push({ swapped: [i + 1, high], pivot: i + 1, phase: 'swap' });
    sortedSet.add(i + 1);
    push({ pivot: i + 1, phase: 'mark' });
    return i + 1;
  };

  const quickSort = (low, high) => {
    if (low > high) return;
    if (low === high) {
      sortedSet.add(low);
      push({ phase: 'mark' });
      return;
    }
    const pivotIndex = partition(low, high);
    quickSort(low, pivotIndex - 1);
    quickSort(pivotIndex + 1, high);
  };

  quickSort(0, arr.length - 1);
  steps.push(
    createSortStep(arr, {
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      phase: 'done'
    })
  );
  return steps;
};

const buildMergeSteps = (input) => {
  const arr = [...input];
  const temp = [...arr];
  const steps = [createSortStep(arr)];
  const push = (options = {}) => steps.push(createSortStep(arr, options));

  const merge = (left, mid, right) => {
    let i = left;
    let j = mid + 1;
    let k = left;

    while (i <= mid && j <= right) {
      push({ active: [i, j], phase: 'compare' });
      if (arr[i] <= arr[j]) temp[k++] = arr[i++];
      else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (let idx = left; idx <= right; idx += 1) {
      arr[idx] = temp[idx];
      push({ swapped: [idx], phase: 'overwrite' });
    }
  };

  const mergeSort = (left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  };

  mergeSort(0, arr.length - 1);
  steps.push(
    createSortStep(arr, {
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      phase: 'done'
    })
  );
  return steps;
};

const createPathStep = (options = {}) => ({
  visited: options.visited || [],
  frontier: options.frontier || [],
  path: options.path || [],
  current: options.current || null,
  phase: options.phase || 'idle'
});

const reconstructPath = (parents, endKey) => {
  const path = [];
  let cursor = endKey;
  while (cursor) {
    path.push(cursor);
    cursor = parents.get(cursor);
  }
  return path.reverse();
};

// BFS step builder for shortest unweighted path
const buildBfsSteps = (grid) => {
  const startKey = keyFor(grid.start.row, grid.start.col);
  const endKey = keyFor(grid.end.row, grid.end.col);
  const visited = new Set([startKey]);
  const queue = [startKey];
  const parents = new Map([[startKey, null]]);
  const steps = [createPathStep({ visited: [startKey], frontier: [startKey], phase: 'start' })];
  let found = false;

  while (queue.length) {
    const current = queue.shift();
    steps.push(
      createPathStep({
        visited: [...visited],
        frontier: [...queue],
        current,
        phase: 'visit'
      })
    );

    if (current === endKey) {
      found = true;
      break;
    }

    const [row, col] = parseKey(current);
    neighborsOf(row, col).forEach(([nr, nc]) => {
      const next = keyFor(nr, nc);
      if (grid.walls.has(next) || visited.has(next)) return;
      visited.add(next);
      parents.set(next, current);
      queue.push(next);
      steps.push(
        createPathStep({
          visited: [...visited],
          frontier: [...queue],
          current: next,
          phase: 'discover'
        })
      );
    });
  }

  const path = found ? reconstructPath(parents, endKey) : [];
  steps.push(
    createPathStep({
      visited: [...visited],
      path,
      current: path[path.length - 1] || null,
      phase: path.length ? 'done' : 'blocked'
    })
  );
  return steps;
};

// A* step builder using Manhattan heuristic
const buildAStarSteps = (grid) => {
  const startKey = keyFor(grid.start.row, grid.start.col);
  const endKey = keyFor(grid.end.row, grid.end.col);
  const steps = [createPathStep({ visited: [startKey], frontier: [startKey], phase: 'start' })];
  const open = [startKey];
  const openSet = new Set([startKey]);
  const visited = new Set();
  const parents = new Map([[startKey, null]]);
  const g = new Map([[startKey, 0]]);
  const end = grid.end;
  let found = false;

  while (open.length) {
    open.sort((a, b) => {
      const [ar, ac] = parseKey(a);
      const [br, bc] = parseKey(b);
      const aScore = (g.get(a) || Infinity) + manhattan({ row: ar, col: ac }, end);
      const bScore = (g.get(b) || Infinity) + manhattan({ row: br, col: bc }, end);
      return aScore - bScore;
    });

    const current = open.shift();
    openSet.delete(current);
    visited.add(current);
    steps.push(
      createPathStep({
        visited: [...visited],
        frontier: [...openSet],
        current,
        phase: 'visit'
      })
    );

    if (current === endKey) {
      found = true;
      break;
    }

    const [row, col] = parseKey(current);
    neighborsOf(row, col).forEach(([nr, nc]) => {
      const next = keyFor(nr, nc);
      if (grid.walls.has(next)) return;

      const tentative = (g.get(current) || Infinity) + 1;
      if (tentative < (g.get(next) || Infinity)) {
        parents.set(next, current);
        g.set(next, tentative);
        if (!openSet.has(next) && !visited.has(next)) {
          openSet.add(next);
          open.push(next);
        }
        steps.push(
          createPathStep({
            visited: [...visited],
            frontier: [...openSet],
            current: next,
            phase: 'discover'
          })
        );
      }
    });
  }

  const path = found ? reconstructPath(parents, endKey) : [];
  steps.push(
    createPathStep({
      visited: [...visited],
      path,
      current: path[path.length - 1] || null,
      phase: path.length ? 'done' : 'blocked'
    })
  );
  return steps;
};

const SORT_ALGOS = {
  bubble: {
    label: 'Bubble Sort',
    description: 'Compares adjacent bars and swaps when out of order.',
    build: buildBubbleSteps
  },
  quick: {
    label: 'Quick Sort',
    description: 'Partitions around a pivot and recursively sorts segments.',
    build: buildQuickSteps
  },
  merge: {
    label: 'Merge Sort',
    description: 'Splits into halves, then merges sorted segments.',
    build: buildMergeSteps
  }
};

const PATH_ALGOS = {
  bfs: {
    label: 'BFS',
    description: 'Explores layer by layer, guarantees shortest path in unweighted grids.',
    build: buildBfsSteps
  },
  astar: {
    label: 'A*',
    description: 'Uses heuristic-guided search for faster convergence to the target.',
    build: buildAStarSteps
  }
};

const AlgorithmVisualizer = () => {
  const [mode, setMode] = useState('sorting');
  const [sortAlgorithm, setSortAlgorithm] = useState('bubble');
  const [pathAlgorithm, setPathAlgorithm] = useState('bfs');
  const [speed, setSpeed] = useState(65);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [baseArray, setBaseArray] = useState(() => randomArray());
  const [grid, setGrid] = useState(() => createGrid());

  const activeAlgorithm = mode === 'sorting' ? sortAlgorithm : pathAlgorithm;

  const steps = useMemo(() => {
    if (mode === 'sorting') return SORT_ALGOS[sortAlgorithm].build(baseArray);
    return PATH_ALGOS[pathAlgorithm].build(grid);
  }, [mode, sortAlgorithm, pathAlgorithm, baseArray, grid]);

  const currentStep = steps[stepIndex] || steps[0];

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return undefined;
    }

    const interval = Math.max(20, 260 - speed * 2.2);
    const timer = window.setInterval(() => {
      setStepIndex((value) => {
        if (value >= steps.length - 1) {
          setIsPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, interval);

    return () => window.clearInterval(timer);
  }, [isPlaying, speed, stepIndex, steps.length]);

  const restart = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const regenerate = () => {
    setIsPlaying(false);
    setStepIndex(0);
    if (mode === 'sorting') setBaseArray(randomArray());
    else setGrid(createGrid());
  };

  const activeSet = new Set(currentStep?.active || []);
  const swappedSet = new Set(currentStep?.swapped || []);
  const sortedSet = new Set(currentStep?.sorted || []);
  const visitedSet = new Set(currentStep?.visited || []);
  const frontierSet = new Set(currentStep?.frontier || []);
  const pathSet = new Set(currentStep?.path || []);

  const phaseText =
    mode === 'sorting'
      ? ({
          compare: 'Comparing',
          swap: 'Swapping',
          overwrite: 'Overwriting',
          mark: 'Marking sorted',
          done: 'Completed'
        }[currentStep?.phase] || 'Ready')
      : ({
          start: 'Initialized',
          visit: 'Visiting nodes',
          discover: 'Discovering neighbors',
          done: 'Path found',
          blocked: 'No path found'
        }[currentStep?.phase] || 'Ready');

  const description =
    mode === 'sorting'
      ? SORT_ALGOS[sortAlgorithm].description
      : PATH_ALGOS[pathAlgorithm].description;

  return (
    <section id="algorithms" className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up">Algorithm Visualizer</h2>
        <p className="mt-3 mb-8 max-w-[62ch] text-zinc-400 reveal-up">
          Explore sorting and pathfinding with real-time animation, clean controls, and
          step-by-step state highlighting.
        </p>

        <div className="rounded-2xl border border-zinc-700/60 bg-zinc-800/35 p-5 md:p-6 reveal-up">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-700/60 bg-zinc-900/55 p-3">
            <div className="inline-flex rounded-lg border border-zinc-700/70 bg-zinc-900/80 p-1">
              {[
                { id: 'sorting', label: 'Sorting' },
                { id: 'pathfinding', label: 'Pathfinding' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id);
                    setIsPlaying(false);
                    setStepIndex(0);
                  }}
                  className={
                    'cursor-hover rounded-md px-3 py-1.5 text-xs font-medium transition-colors ' +
                    (mode === item.id
                      ? 'bg-sky-500/20 text-zinc-100'
                      : 'text-zinc-400 hover:text-zinc-200')
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <select
              value={activeAlgorithm}
              onChange={(e) => {
                if (mode === 'sorting') setSortAlgorithm(e.target.value);
                else setPathAlgorithm(e.target.value);
                setIsPlaying(false);
                setStepIndex(0);
              }}
              className="cursor-hover rounded-lg border border-zinc-700/70 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-sky-400"
            >
              {Object.entries(mode === 'sorting' ? SORT_ALGOS : PATH_ALGOS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>

            <div className="ml-auto flex min-w-[180px] items-center gap-2">
              <span className="text-xs text-zinc-400">Speed</span>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                className="btn btn-primary cursor-hover"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button type="button" onClick={restart} className="btn btn-outline cursor-hover">
                Reset
              </button>
              <button type="button" onClick={regenerate} className="btn btn-outline cursor-hover">
                {mode === 'sorting' ? 'Shuffle' : 'New Maze'}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <p>{description}</p>
            <p>
              {phaseText} - Step {Math.min(stepIndex + 1, steps.length)} / {steps.length}
            </p>
          </div>

          {mode === 'sorting' ? (
            <div className="mt-5 h-[330px] w-full rounded-xl border border-zinc-700/60 bg-zinc-900/65 p-4">
              <div className="flex h-full items-end gap-[3px] md:gap-1">
                {currentStep.array.map((value, index) => {
                  let colorClass = 'bg-zinc-500/70';
                  if (sortedSet.has(index)) colorClass = 'bg-emerald-400';
                  else if (swappedSet.has(index)) colorClass = 'bg-rose-400';
                  else if (currentStep.pivot === index) colorClass = 'bg-amber-300';
                  else if (activeSet.has(index)) colorClass = 'bg-sky-400';

                  return (
                    <div key={index} className="relative flex h-full flex-1 items-end">
                      <div
                        className={`w-full rounded-t-md transition-[height,background-color] duration-150 ${colorClass}`}
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-zinc-700/60 bg-zinc-900/65 p-4">
              <div
                className="mx-auto grid w-full max-w-[720px] gap-1"
                style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, index) => {
                  const row = Math.floor(index / GRID_COLS);
                  const col = index % GRID_COLS;
                  const key = keyFor(row, col);
                  const isStart = key === keyFor(grid.start.row, grid.start.col);
                  const isEnd = key === keyFor(grid.end.row, grid.end.col);
                  const isWall = grid.walls.has(key);
                  const isCurrent = currentStep.current === key;
                  const isPath = pathSet.has(key);
                  const isFrontier = frontierSet.has(key);
                  const isVisited = visitedSet.has(key);

                  let colorClass = 'bg-zinc-700/70';
                  if (isWall) colorClass = 'bg-zinc-950';
                  if (isVisited) colorClass = 'bg-sky-600/60';
                  if (isFrontier) colorClass = 'bg-sky-400';
                  if (isPath) colorClass = 'bg-emerald-400';
                  if (isCurrent) colorClass = 'bg-amber-300';
                  if (isStart) colorClass = 'bg-violet-400';
                  if (isEnd) colorClass = 'bg-rose-400';

                  return (
                    <div
                      key={key}
                      className={`aspect-square rounded-[3px] transition-colors duration-150 ${colorClass}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            {mode === 'sorting' ? (
              <>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> compare
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> swap / overwrite
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" /> pivot
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> sorted
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-600/60" /> visited
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> frontier
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" /> current
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> path
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" /> wall
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmVisualizer;
