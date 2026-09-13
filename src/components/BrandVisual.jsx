export default function BrandVisual({ icon, title, subtitle, items = [], size = 'sm' }) {
  return (
    <div className={`brand-visual brand-visual--${size}`}>
      <div className="brand-visual__glow" />
      {icon && <i className={`${icon} brand-visual__icon`} aria-hidden="true" />}
      <div className="brand-visual__body">
        {title && <h4 className="brand-visual__title">{title}</h4>}
        {subtitle && <p className="brand-visual__subtitle">{subtitle}</p>}
        {items.length > 0 && (
          <ul className="brand-visual__list">
            {items.map((item, i) => (
              <li key={i}><i className="ti-check" />{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}