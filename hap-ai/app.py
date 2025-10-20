# app.py
from palette import get_palette

# 테스트용 입력값
primary = input("1차 감정을 입력하세요 (예: 혼자, 사람들과, 활동적 등): ")
secondary = input("2차 감정을 입력하세요 (예: 고요함, 활기참, 설렘 등): ")

# 결과 출력
colors = get_palette(primary, secondary)
print(f"\n[{primary} + {secondary}]에 어울리는 색상 팔레트는 👇")
for color in colors:
    print(color)
