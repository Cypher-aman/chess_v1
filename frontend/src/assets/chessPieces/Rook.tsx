function Rook ({ color, width = "40", height = "40" }: { color: string, width?: string, height?: string }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 69 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
    >
      <path
        d="M0 0.75H17.5V11.25H24.5V0.75H43.75V11.25H50.75V0.75H68.25V16.5L54.25 27L57.75 58.5H10.5L14 27L0 16.5V0.75Z"
        fill={color}
      />
      <path
        d="M10.5 65.5H57.75L68.25 79.5V93.5H0V79.5L10.5 65.5Z"
        fill={color}
      />
    </svg>
  );
}

export default Rook;
