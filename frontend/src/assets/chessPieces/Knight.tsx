function Knight ({ color, width = "40", height = "40" }: { color: string, width?: string, height?: string }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 91 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        stroke="black"
        d="M55.5487 19.2824L39.7394 0.843323C37.451 5.18787 35.2324 12.8557 38.4221 18.391C36.8739 18.5289 35.3944 18.7907 34.25 19.25C26.9488 22.18 18.9375 29.75 15 45.5C13.8599 50.0606 11.8078 52.2445 9.36884 54.8402C7.06823 57.2887 4.42338 60.1035 1.875 65.625C-3.37499 77 10.7936 88.375 21.125 78.0436C26.9335 72.2351 32.0106 69.8372 36.2733 67.824C42.4085 64.9265 46.8564 62.8258 49.3689 52.5C50.5642 57.3165 50.0861 68.6835 38.6107 75.6192C27.1353 82.555 24.7445 97.1651 24.9836 101.5H90.25C90.25 60.3456 84.8013 24.7884 55.5487 19.2824Z"
        fill={color}
      />
    </svg>
  );
}

export default Knight;
