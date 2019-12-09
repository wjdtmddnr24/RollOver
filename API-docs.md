### /api/, GET, 실습실 목록 가져오기

#### Request Params

없음

#### Response Params

- laboratories : [laboratory], 실습실 배열

  - name : string, 실습실 이름
  - created : date, 실습실 추가된 날짜
  - location : string, 실습실 위치 ( XX 대학교 건물명 XXX 호 )
  - img_url : string, 실습실 이미지 주소

  - computers : [computer], 컴퓨터 배열
    - name : string, 컴퓨터 이름
    - created : date, 컴퓨터 추가된 날짜
    - location : 배치도 내 컴퓨터 위치 ( X 좌표, Y 좌표 ), 너비, 높이
      - X : number, 컴퓨터 위치 ( X 좌표 )
      - Y : number, 컴퓨터 위치 ( Y 좌표 )
      - W : number, 컴퓨터 너비
      - H : number, 컴퓨터 높이
    - property : string, 컴퓨터의 속성 ( 운영체제 종류, 모니터 크기 등 )
    - reports : [report], 제보 배열
      - title : string, 제보 제목
      - content : string, 제보 내용
      - author : string, 제보 작성자
      - created : date, 제보가 작성된 날짜
      - tags : array[string],  제보에 추가할 태그들
      - status : number, 컴퓨터 상태 ( 0 인 경우 : 문제가 있는 컴퓨터, 1인 경우 : 문제가 해결된 컴퓨터 )
      - comments : [comment], 댓글 배열
        - author : string, 댓글 작성자 
        - created : date, 댓글이 작성된 날짜
        - title : string, 댓글 제목
        - content : string, 댓글 내용



### /api/, POST, 실습실 추가하기

#### Request Params

- name : string, 실습실 이름
- img_url : string, 실습실 위치 ( XX 대학교 건물명 XXX 호 )
- location : string, 실습실 이미지 주소

#### Response Params

- result : string, 성공할 경우 : "success", 실패할 경우 : "error"와 함께 error 파라미터 추가
- error : string, 해당 실습실이 없는 경우 : "no such laboratory!", 해당 컴퓨터가 없는 경우 : "no such computer!"



### /api/:laboratory, GET, 해당 실습실의 컴퓨터 목록 가져오기

#### Request Params

없음

#### Response Params

laboratory : `_id=:laboratory` 에 해당하는 실습실 가져오기

- name : string, 실습실 이름
- created : date, 실습실 추가된 날짜
- location : string, 실습실 위치 ( XX 대학교 건물명 XXX 호 )
- img_url : string, 실습실 이미지 주소

- computers : [computer], 컴퓨터 배열
  - name : string, 컴퓨터 이름
  - created : date, 컴퓨터 추가된 날짜
  - location : 배치도 내 컴퓨터 위치 ( X 좌표, Y 좌표 ), 너비, 높이
    - X : number, 컴퓨터 위치 ( X 좌표 )
    - Y : number, 컴퓨터 위치 ( Y 좌표 )
    - W : number, 컴퓨터 너비
    - H : number, 컴퓨터 높이
  - property : string, 컴퓨터의 속성 ( 운영체제 종류, 모니터 크기 등 )
  - reports : [report], 제보 배열
    - title : string, 제보 제목
    - content : string, 제보 내용
    - author : string, 제보 작성자
    - created : date, 제보가 작성된 날짜
    - tags : array[string],  제보에 추가할 태그들
    - status : number, 컴퓨터 상태 ( 0 인 경우 : 문제가 있는 컴퓨터, 1인 경우 : 문제가 해결된 컴퓨터 )
    - comments : [comment], 댓글 배열
      - author : string, 댓글 작성자 
      - created : date, 댓글이 작성된 날짜
      - title : string, 댓글 제목
      - content : string, 댓글 내용



### /api/:laboratory, POST, 해당 실습실에 컴퓨터 추가하기

#### Request Params

- type : string, 컴퓨터 추가, 컴퓨터 일괄 추가, 이름 변경, 크기 변경, 삭제 등의 기능 중 어느 기능을 사용할지 설정
  - 'add-computer' : 컴퓨터 한대 추가
  - 'add-computers' : 컴퓨터 일괄 추가
  - 'resize-computer' : 컴퓨터 크기 변경
  - 'rename-computer' : 컴퓨터 이름 변경
  - 'remove-computer' : 컴퓨터 삭제
  - 'move-computer' : 컴퓨터 배치도 위치 이동
- _id : string, 컴퓨터 고유 ID
- name : string, 컴퓨터 이름 ( 번호 )
- location : 배치도 내 컴퓨터 위치 ( X 좌표, Y 좌표 ), 너비, 높이
  - X : number, 컴퓨터 위치 ( X 좌표 )
  - Y : number, 컴퓨터 위치 ( Y 좌표 )
  - W : number, 컴퓨터 너비
  - H : number, 컴퓨터 높이
- property : string, 컴퓨터의 속성 ( 운영체제 종류, 모니터 크기 등 )
- data : [data] 여러대 컴퓨터 추가할 시 각 컴퓨터의 내용들
  - name : string, 컴퓨터 이름 ( 번호 )
  - location : 배치도 내 컴퓨터 위치 ( X 좌표, Y 좌표 ), 너비, 높이
    - X : number, 컴퓨터 위치 ( X 좌표 )
    - Y : number, 컴퓨터 위치 ( Y 좌표 )
    - W : number, 컴퓨터 너비
    - H : number, 컴퓨터 높이
  - property : string, 컴퓨터의 속성 ( 운영체제 종류, 모니터 크기 등 )

#### Response Params

- result : string, 성공할 경우 : "success", 실패할 경우 : "error"와 함께 error 파라미터 추가
- error : string, 해당 실습실이 없는 경우 : "no such laboratory!", 해당 컴퓨터가 없는 경우 : "no such computer!"



### /api/:laboratory/:computer, GET, 해당 컴퓨터의 제보들 가져오기

#### Request Params

없음

#### Response Params

- computer : `_id=:computer` 에 해당하는 컴퓨터 가져오기
  - name : string, 컴퓨터 이름
  - created : date, 컴퓨터 추가된 날짜
  - location : 배치도 내 컴퓨터 위치 ( X 좌표, Y 좌표 ), 너비, 높이
    - X : number, 컴퓨터 위치 ( X 좌표 )
    - Y : number, 컴퓨터 위치 ( Y 좌표 )
    - W : number, 컴퓨터 너비
    - H : number, 컴퓨터 높이
  - property : string, 컴퓨터의 속성 ( 운영체제 종류, 모니터 크기 등 )
  - reports : [report], 제보 배열
    - title : string, 제보 제목
    - content : string, 제보 내용
    - author : string, 제보 작성자
    - created : date, 제보가 작성된 날짜
    - tags : array[string],  제보에 추가할 태그들
    - status : number, 컴퓨터 상태 ( 0 인 경우 : 문제가 있는 컴퓨터, 1인 경우 : 문제가 해결된 컴퓨터 )
    - comments : [comment], 댓글 배열
      - author : string, 댓글 작성자 
      - created : date, 댓글이 작성된 날짜
      - title : string, 댓글 제목
      - content : string, 댓글 내용



### /api/:laboratory/:computer, POST, 해당 컴퓨터에 제보 추가하기

#### Request Params

- title : string, 제보 제목
- tags : array[string], 제보에 추가할 태그들 ( 중복되는 원소가 없어야 함 )
- content : string, 제보 내용

#### Response Params

- result : string, 성공할 경우 : "success", 실패할 경우 : "error"와 함께 error 파라미터 추가
- error : string, 해당 실습실이 없는 경우 : "no such laboratory!", 해당 컴퓨터가 없는 경우 : "no such computer!"



### /api/:laboratory/:computer/:report, GET, 해당 제보의 댓글들 가져오기

#### Request Params

없음

#### Response Params

- report : `_id=:report` 에 해당하는 제보 가져오기
  - title : string, 제보 제목
  - content : string, 제보 내용
  - author : string, 제보 작성자
  - created : date, 제보가 작성된 날짜
  - tags : array[string],  제보에 추가할 태그들
  - status : number, 컴퓨터 상태 ( 0 인 경우 : 문제가 있는 컴퓨터, 1인 경우 : 문제가 해결된 컴퓨터 )
  - comments : [comment], 댓글 배열
    - author : string, 댓글 작성자 
    - created : date, 댓글이 작성된 날짜
    - title : string, 댓글 제목
    - content : string, 댓글 내용



### /api/:laboratory/:computer/:report, POST, 해당 제보에 댓글 추가하기

#### Request Params

- title : string, 댓글 제목
- content : string, 댓글 내용

#### Response Params

- result : string, 성공할 경우 : "success", 실패할 경우 : "error"와 함께 error 파라미터 추가
- error : string, 해당 실습실이 없는 경우 "no such labratory!", 해당 컴퓨터가 없는 경우 : "no such computer!", 해당 댓글이 없는 경우 : "no such report!" 