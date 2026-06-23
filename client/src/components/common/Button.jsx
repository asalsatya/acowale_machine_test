export default function Button({ children, variant = 'primary', type = 'button', loading = false, disabled = false, onClick, style, id }) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button id={id} type={type} className={cls} onClick={onClick} disabled={disabled || loading} style={style}>
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
