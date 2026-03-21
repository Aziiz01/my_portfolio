/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import PropTypes from 'prop-types';


/**
 * Primary Button
 */

const ButtonPrimary = ({
  href,
  target = '_self',
  label,
  icon,
  classes,
  rel,
  download
}) => {
  const linkRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={linkRel}
        download={download}
        className={'btn btn-primary ' + (classes || '')}
      >
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </a>
    )
  } else {
    return (
      <button className={"btn btn-primary " + classes}>
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </button>
    )
  }
}

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
  rel: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}


/**
 * Outline Button
 */

const ButtonOutline = ({
  href,
  target = '_self',
  label,
  icon,
  classes,
  rel,
  download
}) => {
  const linkRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={linkRel}
        download={download}
        className={'btn btn-outline ' + (classes || '')}
      >
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </a>
    )
  } else {
    return (
      <button className={"btn btn-outline " + classes}>
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </button>
    )
  }
}

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
  rel: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}

export {
  ButtonPrimary,
  ButtonOutline
}