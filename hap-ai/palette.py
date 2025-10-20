# palette.py
# 감정 조합별 색상 팔레트 데이터

PALETTE = {
    ("혼자", "고요함"): ["#9EB7E5", "#C5D5F0", "#E4E8EF"],
    ("혼자", "따뜻함"): ["#F2C6A0", "#F9DCC4", "#FAEDCD"],
    ("혼자", "편안함"): ["#C7E9B0", "#E8F3D6", "#BCE2C9"],
    ("사람들과", "활기참"): ["#F6A6B2", "#FFCF9C", "#FFD6A5"],
    ("사람들과", "편안함"): ["#C7E9B0", "#E8F3D6", "#BCE2C9"],
    ("활동적", "설렘"): ["#FBC4AB", "#FFDAC1", "#FFECDA"],
    ("감상적", "그리움"): ["#A3C4F3", "#B5D5F2", "#D7E3FC"],
}

def get_palette(primary: str, secondary: str):
    """
    1차 감정(primary), 2차 감정(secondary)에 해당하는 색상 팔레트 반환
    """
    return PALETTE.get((primary, secondary), ["#CCCCCC", "#DDDDDD", "#EEEEEE"])
