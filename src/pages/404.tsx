// fallback page
import { keyframes, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import gettingReadyImage from 'public/images/song-bird_logo.png';
import { useEffect, useState } from 'react';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const FlexContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const TextCenter = styled('div')`
  text-align: center;
  h1,
  h3 {
    margin: 10px;
    cursor: default;
    .fade-in {
      animation: ${fadeIn} 2s ease infinite;
    }
  }
  h1 {
    font-size: 8em;
    transition: font-size 200ms ease-in-out;
    border-bottom: 1px dashed white;
    span#digit1 {
      animation-delay: 200ms;
    }
    span#digit2 {
      animation-delay: 300ms;
    }
    span#digit3 {
      animation-delay: 400ms;
    }
  }
`;
export default function Fallback() {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState<number>(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      router.push('/');
    }
  }, [remainingTime, router]);

  return (
    <FlexContainer>
      <TextCenter>
        <Image
          src={gettingReadyImage}
          alt="getting Ready"
          placeholder="blur"
          width={240}
          height={240}
          objectFit="contain"
        />
        <br />
        <h1>
          <span id="digit1">4</span>
          <span id="digit2">0</span>
          <span id="digit3">4</span>
        </h1>
        <h3>페이지를 찾을 수 없습니다 ㅠㅠ</h3>
        <p>{remainingTime}초 후에 메인페이지로 이동합니다</p>
      </TextCenter>
    </FlexContainer>
  );
}
