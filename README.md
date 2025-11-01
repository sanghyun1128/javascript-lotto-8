# javascript-lotto-precourse

## 구현할 기능 목록

> ### 고객 (Customer)
>
> - 보유 금액 저장
>   - 양수인지 확인
>   - 1000원 단위 확인
> - 당첨 내역을 순위 별로 저장
> - 저장된 당첨 내역을 바탕으로 수익률 계산
>
> [Customer.js](src/domain/Customer.js), [CustomerTest.js](__tests__/domain/CustomerTest.js)

> ### 로또 상점 (LottoShop)
>
> - 로또 발행
>   - 랜덤 값 오름차순 정렬해서 발행
>   - 발행시 발행한 로또 상점에 기록
> - 구매자가 로또 구매
>   - 보유 금액이 충분한지 확인
> - 당첨, 보너스 번호 저장
>   - 입력 값이 숫자 범위 안에 있는지 확인
>   - 입력 값끼리 겹치지 않는지 확인
>   - 당첨 번호가 6개 들어 왔는지 확인
> - 로또 등수와 당첨금 확인
>   - 당첨, 보너스 번호가 입력 되어 있는지 확인
>   - 판매한 로또인지 확인
>
> [LottoShop.js](src/domain/LottoShop.js), [LottoShopTest.js](__tests__/domain/LottoShopTest.js)

> ### 로또 (Lotto)
>
> - 로또 발행
>   - 로또 번호가 6개 들어 왔는지 확인
>   - 중복이 없는지 확인
>   - 숫자 범위 안에 있는지 확인
>   - 정렬이 되어 있는지 확인
>
> [Lotto.js](src/domain/Lotto.js), [LottoTest.js](__tests__/domain/LottoTest.js)

> ### 입력/출력 (UI)
>
> - 유저한테 정수형 입력 받기
>   - 숫자로 변환 가능한지 확인
>   - 소수점 없는지 확인
>   - 계산 가능한 크기의 값인지 확인
> - 유저한테 정수형 리스트 ',' 기준으로 입력 받기
>   - ',' 기준으로 split 했을 때 각 항목이 정수형인지 확인
> - 유저한테 적절한 메시지 보여 주기
> - 유저한테 에러 메시지 보여 주기
>
> [InputManager.js](src/ui/InputManager.js), [OutputManager.js](src/ui/OutputManager.js), [messages.js](src/consts/messages.js), [errorMessages.js](src/consts/errorMessages.js)

> ### 컨트롤러
>
> - 프로그램 실행 흐름 컨트롤러 구현
>
> [Controller.js](src/Controller.js), [App.js](src/App.js), [ApplicationTest.js](__tests__/ApplicationTest.js)

> ### 기타
>
> - 리펙토링
