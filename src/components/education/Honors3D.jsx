const Honors3D = () => {
  return (
    <div
      style={{
        height: '160px',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '10px',
        border: '1px solid rgba(0,212,255,0.12)',
        background: 'linear-gradient(135deg, rgba(0,10,20,0.8) 0%, rgba(0,20,30,0.6) 100%)',
      }}
    >
      <iframe
        title="Graduation cap 3D model"
        style={{ width: '100%', height: '100%', border: 'none' }}
        src="https://sketchfab.com/models/16c5a71fdb2b4751961966e41d1e7b92/embed?autostart=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_hint=0&ui_inspector=0&ui_watermark=0&ui_watermark_link=0&ui_theme=dark&transparent=1"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    </div>
  );
};

export default Honors3D;
