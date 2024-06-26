/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="개인정보처리방침"
        description="송버드 서비스의 개인정보처리방침을 안내합니다."
      />

      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" paragraph fontWeight={700}>
          개인정보처리방침
        </Typography>
        <Typography variant="body1" paragraph>
          혜심('이하 '회사')는 "송버드" 서비스(이하 "서비스"라고 함) 운영 간
          회원님의 개인정보를 중요시하며, 개인정보의 보호와 관련하여 정보통신망
          이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법, 전기통신사업법,
          통신비밀보호법 등 개인정보와 관련된 법령 상의 개인정보 보호 규정 및
          방송통신위원회가 제정한 개인정보보호지침을 준수하고 있습니다. 회사는
          개인정보취급방침을 통하여 회원님들의 개인정보가 남용되거나 유출되지
          않도록 최선을 다할 것이며, 회원님께서 제공하시는 개인정보가 어떠한
          용도와 방식으로 이용되고 있고, 개인정보보호를 위해 어떠한 조치가
          취해지고 있는지 알려드리고자 합니다. 단, 본 개인정보 취급방침은 정부의
          법령 및 지침의 변경, 또는 보다 나은 서비스의 제공을 위하여 그 내용이
          변경될 수 있으니, 회원님들께서는 사이트 방문 시 수시로 그 내용을
          확인하여 주시기 바라며, 회사는 개인정보취급방침을 개정하는 경우
          웹사이트 공지사항(또는 개별 공지)을 통하여 공지할 것입니다.
        </Typography>
        {/* 1. 수집하는 개인정보 항목 */}
        <Typography variant="h6" paragraph fontWeight={700}>
          1. 수집하는 개인정보 항목
        </Typography>
        <Typography variant="body1" paragraph>
          회사는 서비스 이용을 위해 아래와 같은 개인정보를 수집하고 있으며
          필요한 최소한의 정보만을 수집합니다.
        </Typography>
        <Typography variant="body1" paragraph fontWeight={600}>
          수집 항목: 이메일, Youtube 계정 보기(동영상 및 재생목록, Youtube
          활동), Oauth 중 공개로 설정한 정보(이름, 프로필 사진, 이메일, 성별)
        </Typography>
        <Typography variant="body1" paragraph>
          - 필수항목: 이메일, 비밀번호, 닉네임, 프로필 사진, 국가, 언어 <br />
          회사는 고객님의 선택에 따라 소셜 로그인(이하 “OAuth“라고 함)을 사용할
          수 있도록 하고 있습니다. OAuth 서비스 제공자의 OAuth 서비스를
          이용하고자 할 경우 다음의 필수 정보를 입력하여야 합니다. <br />
        </Typography>
        <TableContainer
          sx={{
            maxWidth: '70%',
            margin: '20px auto',
          }}
          component={Paper}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  이용자 ID
                </TableCell>
                <TableCell
                  sx={{
                    color: '#000',
                  }}
                >
                  OAuth를 제공하는 서비스의 사용자ID
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  이메일
                </TableCell>
                <TableCell
                  sx={{
                    color: '#000',
                  }}
                >
                  OAuth를 제공하는 서비스에 등록되고 접근이 허락된 사용자 이메일
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  이름
                </TableCell>
                <TableCell
                  sx={{
                    color: '#000',
                  }}
                >
                  OAuth를 제공하는 서비스에 등록된 사용자명, 별칭
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="body1" paragraph>
          또한, OAuth 서비스 제공자의 OAuth 서비스 이용 시 고객님의 데이터에
          액세스하고 서비스에 사용할 수 있습니다. OAuth 서비스 이용 과정에서
          자동생성 되어 저장되는 정보는 아래와 같습니다. OAuth 서비스 제공자에게
          전달받은 Token 정보 회사는 OAuth 서비스를 이용하여 제공받은 데이터나
          개인정보를 저장하지 않습니다. OAuth 서비스의 이용을 원치 않는 경우
          언제든지 연결 해제 버튼을 클릭하여 연결을 해제할 수 있으며, 이 경우
          저장되어 있던 Token 정보는 삭제됩니다.
        </Typography>

        {/* 2. 개인정보의 수집 및 이용목적 */}
        <Typography variant="h6" paragraph fontWeight={700}>
          2. 개인정보의 수집 및 이용목적
        </Typography>

        <Typography variant="body1" paragraph>
          가. 회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스
          이용의사를 확인하여 최적화되고 맞춤화된 서비스를 제공하기 위함입니다.
          회사는 최초 회원가입 시 서비스 제공을 원활하게 하기 위해 필요한
          최소한의 정보만을 수집하고 있습니다.
          <br />
          나. 회사는 개인정보를 수집 및 이용목적 이외에 다른 용도로 이를
          이용하거나 이용자의 동의 없이 제3자에게 제공하지 않습니다.
          <br />
          다. 회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다. 회원
          가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
          유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리, 민원인의
          신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보,
          물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스
          제공, 본인인증, 요금결제·정산, 신규 서비스(제품) 개발 및 맞춤 서비스
          제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적
          특성에 따른 서비스 제공 및 광고 게재 , 접속빈도 파악 또는 회원의
          서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
          <br />
          라. 당사 데이터베이스를 최신으로 유지하고 귀하에게 가장 연관성이 높은
          콘텐츠와 경험을 제공하기 위해, 당사는 귀하가 제공하는 정보를 해당
          법률에 따라 서드파티 소스의 정보와 조합할 수 있습니다. 예컨대,
          (회사명을 제공한 경우) 근무하는 회사에 대한 규모, 업종 및 기타 정보를
          전문 네트워킹 사이트 및 정보 서비스 공급자 등의 소스에서 얻을 수
          있습니다. 또한 사기, 보안 또는 기술 문제의 감지, 예방 또는 해결 및
          회사와 직원, 사용자, 어린이 또는 일반인이 권리, 재산 또는 안전에 대한
          피해의 방지 등을 목적으로 파트너를 포함한 서드파티 및 공개적으로
          액세스할 수 있는 출처에서 정보를 수집하고 받을 수 있으며, 서비스
          이용과정에서 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록
          등이 생성되어 수집될 수 있습니다.
          <br />
          마. 회사는 이용자의 개인정보를 수집할 경우 반드시 이용자의 동의를 얻어
          수집하며, 이용자의 기본적 인권을 침해할 우려가 있는 인종, 출신지,
          본적지, 사상, 정치적 성향, 범죄기록, 건강상태 등의 정보는 이용자의
          동의 또는 법령의 규정에 의한 경우 이외에는 수집하지 않습니다.
          <br />
          사. 당사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며
          개인정보의 수집•이용에 법정대리인의 동의가 필요한 만 14세 미만 아동의
          개인정보는 원칙적으로 수집하지 않습니다. 단, 법정대리인의 동의를 얻은
          경우에는 만 14세 미만 이용자의 개인정보를 수집•이용할 수 있습니다.
          <br />
        </Typography>

        {/* 3. 개인정보의 보유, 이용기간 및 파기 */}
        <Typography variant="h6" paragraph fontWeight={700}>
          3. 개인정보의 보유, 이용기간 및 파기
        </Typography>

        <Typography variant="body1" paragraph>
          계정에 등록하여 서비스 ID를 만들면 회사는 서비스 및 소프트웨어의 활성
          사용자인 동안 보유한 대부분의 개인 정보를 처리하여 보관합니다. 계정이
          폐쇄되면 회사는 해시 암호 및 토큰화 결제 계정 데이터 같이 업무상
          보유할 이유가 없게 된 특정 개인 정보를 삭제하기 시작합니다. 하지만
          일반적으로 계약 및 비즈니스 거래와 관련된 개인 정보는 마지막으로 상호
          작용한 이후 최대 5년간 보유됩니다. 당사가 마케팅 목적으로 또는 귀하의
          동의하에 개인 정보를 처리하는 경우, 당사는 귀하가 당사에 중단을 요청할
          때까지 그리고 (귀하의 요청을 이행하기 위해) 그 후 짧은 기간 동안
          정보를 처리합니다. 당사는 또한 향후에도 귀하의 요청을 존중할 수 있도록
          다이렉트 마케팅을 귀하에게 보내거나 귀하의 정보를 처리하지 말라고
          당사에 요청한 사실에 대한 반영구 기록을 보관합니다. 전자적 파일 형태의
          개인정보는 복구 및 재생이 되지 않도록 기술적인 방법을 이용하여
          안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식 등으로
          파기합니다. 한편 회사는 대한민국 관계 법령에서 정한 의무 보유 기간을
          충족하는 기간 동안 아래와 같은 개인정보를 보관합니다. 전자상거래
          등에서의 소비자보호에 관한 법률 계약 또는 청약철회 등에 관한 기록
          대금결제 및 재화 등의 공급에 관한 기록 소비자의 불만 또는 분쟁처리에
          관한 기록 표시•광고에 관한 기록 통신비밀보호법 로그 기록 참고: 회사는
          귀하의 명시적인 동의에 따라 또는 다른 법령에서 특별히 요구하는 경우
          위에서 정한 기간보다 장기간 개인정보를 보관할 수 있습니다.
        </Typography>
      </Box>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
