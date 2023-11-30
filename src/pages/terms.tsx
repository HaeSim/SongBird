/* eslint-disable react/no-unescaped-entities */

import { Box, Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="이용약관 | 🎵 SongBird 🎵"
        description="This is the terms page of the 🎵 SongBird 🎵 app."
      />

      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" paragraph>
          송버드 이용약관
        </Typography>
        <Typography variant="body1" paragraph>
          제 1 조: 목적 이 약관은 혜심(이하 "회사"라고 함)가 제공하는 유투브
          재생목록 기반 노래 퀴즈 플랫폼 "송버드" 서비스(이하 "서비스"라고 함)를
          이용하는 이용자와 회사 간의 권리, 의무 및 책임사항을 규정함을 목적으로
          합니다. 이용자가 서비스를 이용함으로써 본 약관에 동의한 것으로
          간주됩니다.
        </Typography>
        <Typography variant="body1" paragraph>
          제 2 조: 약관의 효력 및 변경 1. 이 약관의 내용은 서비스 화면에
          게시하는 방법으로 이용자에게 공시됩니다. 2. 회사는 필요한 경우, 약관을
          변경할 권리를 가지고 있으며 변경 시에는 지체 없이 서비스 화면에
          공시합니다. 3. 변경된 약관은 공시 후 즉시 효력이 발생하며, 이용자는
          변경된 약관에 동의함으로써 서비스를 계속 이용할 수 있습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          제 3 조: 약관 이외의 준칙 이 약관에서 정하지 아니한 사항과 약관의
          해석에 관하여는 관련 법령 및 상관례에 따릅니다.
        </Typography>
        <Typography variant="body1" paragraph>
          제 4 조: 용어의 정의 1. "송버드"란 회사가 제공하는 유투브 재생목록
          기반 노래 퀴즈 플랫폼을 말합니다. 2. "이용자"란 "송버드" 서비스를
          이용하는 회원 및 비회원을 말합니다. 3. "회원"이란 개인정보를 제공하여
          회원등록을 한 자로서, "송버드"의 정보를 지속적으로 제공받으며 서비스를
          이용할 수 있는 자를 말합니다. 4. "비회원"이란 회원에 가입하지 않고
          "송버드" 서비스를 이용하는 자를 말합니다.
        </Typography>
        <Typography variant="body1" paragraph>
          제 5 조: 서비스 이용 자격 1. 이용자는 법적으로 구속력 있는 계약을
          형성할 수 있는 경우에만, 그리고 약관 및 관련 법률을 준수할 시에만
          서비스를 이용할 수 있습니다. 2. 18세 미만의 경우, 이용자의 부모나
          보호자의 동의를 받아야 하며 부모나 보호자는 이용자의 서비스 이용 및
          책임을 지게 됩니다. 3. 13세 미만의 자는 서비스 이용이 엄격히 금지되며,
          이에 대한 위반은 본 약관을 위반하는 것으로 간주됩니다. 4. 이전에
          서비스로부터 퇴출된 이용자는 회사의 재가를 거쳐 이용할 수 있습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          제 6 조: "송버드" 계정 1. 서비스 및 기능에 접속하기 위해서는
          "송버드"에서 계정을 생성해야 합니다. 2. 이용자는 다른 이용자의 계정을
          허락 없이 사용할 수 없으며, 계정의 안전과 활동에 대해 단독으로 책임이
          있습니다. 3. 계정의 보안이 위반되거나 허가 없이 사용되는 경우, 즉시
          회사에 통지해야 합니다. 4. 회사는 계정이 허가 없이 사용되어 발생한
          손실에 대해 책임지지 않습니다.
        </Typography>

        <Typography variant="body1" paragraph>
          제 7 조: 회원탈퇴 및 자격상실 1. 회원은 언제든지 회원탈퇴를 요청할 수
          있으며 회사는 즉시 처리합니다. 2. 회원이 다음의 사유에 해당하는 경우,
          회사는 회원자격을 제한 및 정지시킬 수 있습니다. - 허위 정보 등록 -
          결제 채무 미이행 - 전자상거래 질서 위협 행위 - 법률 위반 행위 등 3.
          회사는 회원자격을 상실시킬 경우 회원등록을 말소하며, 최소 30일 이상의
          기간을 정하여 소명할 기회를 부여합니다.
        </Typography>

        <Typography variant="body1" paragraph>
          제 8 조: "송버드"의 의무 1. 회사는 법령 및 약관에 따라 안정적이고
          지속적인 서비스를 제공하기 위해 최선을 다합니다. 2. 이용자의 개인정보
          보호를 위한 보안 시스템을 갖추어야 합니다. 3. 회사는 이용자의
          개인정보를 사전 승낙 없이 타인에게 공개하거나 배포하지 않습니다.
        </Typography>

        <Typography variant="body1" paragraph>
          제 9 조: 이용자의 의무 1. 서비스 이용 중 금지된 활동에 참여하지 않기로
          동의합니다. 2. "송버드"를 통해 얻은 정보를 무단으로 복사, 배포,
          공개하지 않습니다. 3. 시스템의 무결성이나 보안을 위협하는 행위를 하지
          않습니다. 4. 다른 이용자의 서비스 이용을 방해하지 않습니다. 5.
          서비스에 접속하여 제공되는 컨텐츠에 법률에 위반되는 수단으로 접근하지
          않습니다. 6. 회사의 동의 없이 서비스의 소스코드를 디컴파일하거나
          역엔지니어링하려고 시도하지 않습니다.
        </Typography>

        <Typography variant="body1" paragraph>
          제 10 조: 지적재산권 1. "지적재산권"은 특허권, 저작권, 상표권 등을
          포함하며, 회사는 이에 대한 모든 권리를 보유합니다. 2. 이용자가
          서비스를 통해 게재하는 컨텐츠에 대한 저작권은 이용자 본인에게 있으며,
          회사는 컨텐츠를 활용할 수 있는 라이선스를 가집니다.
        </Typography>

        <Typography variant="body1" paragraph>
          부칙: 본 약관은 2023년 1월 1일부터 시행됩니다.
        </Typography>
      </Box>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
