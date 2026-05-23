export default function GeometricPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="100" cy="100" r="80" stroke="rgba(250,214,74,0.15)" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" stroke="rgba(208,161,57,0.2)" strokeWidth="1" />
      <path
        d="M100 20 L180 100 L100 180 L20 100 Z"
        stroke="rgba(250,214,74,0.12)"
        strokeWidth="1"
      />
      <path
        d="M100 40 L160 100 L100 160 L40 100 Z"
        fill="rgba(250,214,74,0.05)"
      />
    </svg>
  );
}
