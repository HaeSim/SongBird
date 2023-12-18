import { styled } from '@mui/material';

const LoadingIconSvg = styled('svg')`
  animation: spinner 0.6s linear infinite;
  display: block;
  width: 24px;
  height: 24px;
  color: rgba(55, 53, 47, 0.4);
`;

const LoadingIcon = () => {
  return (
    <LoadingIconSvg viewBox="0 0 24 24">
      <defs>
        <linearGradient
          x1="28.1542969%"
          y1="63.7402344%"
          x2="74.6289062%"
          y2="17.7832031%"
          id="linearGradient-1"
        >
          <stop stopColor="rgba(164, 164, 164, 1)" offset="0%" />
          <stop
            stopColor="rgba(164, 164, 164, 0)"
            stopOpacity="0"
            offset="100%"
          />
        </linearGradient>
      </defs>

      <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
        <g transform="translate(-236.000000, -286.000000)">
          <g transform="translate(238.000000, 286.000000)">
            <circle
              id="Oval-2"
              stroke="url(#linearGradient-1)"
              strokeWidth="4"
              cx="10"
              cy="12"
              r="10"
            />
            <path
              d="M10,2 C4.4771525,2 0,6.4771525 0,12"
              id="Oval-2"
              stroke="rgba(164, 164, 164, 1)"
              strokeWidth="4"
            />
            <rect
              id="Rectangle-1"
              fill="rgba(164, 164, 164, 1)"
              x="8"
              y="0"
              width="4"
              height="4"
              rx="8"
            />
          </g>
        </g>
      </g>
    </LoadingIconSvg>
  );
};
const Container = styled('div')`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(min(2vmin, 24px));
`;

export const Loading: React.FC = () => (
  <Container>
    <LoadingIcon />
  </Container>
);
