import time
import re
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def get_naver_map_reviews_no_pandas(keyword, max_results=20):
    # 1. 크롬 드라이버 설정 및 브라우저 열기
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless') # 화면에 브라우저를 띄우지 않으려면 주석 해제
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    # 2. 네이버 지도 검색 URL 접속
    url = f"https://naver.com{keyword}"
    driver.get(url)
    time.sleep(5) # 페이지 로딩 대기
    
    # 3. 네이버 플레이스 리스트 iframe 전환
    try:
        driver.switch_to.frame("searchIframe")
    except:
        print("검색 결과 프레임을 찾을 수 없습니다.")
        driver.quit()
        return []

    # 4. 결과 스크롤 다운 (데이터 더 불러오기)
    try:
        scroll_container = driver.find_element(By.CSS_SELECTOR, "#_pcmap_list_scroll_container")
        for _ in range(3): 
            driver.execute_script("arguments.scrollTo(0, arguments.scrollHeight);", scroll_container)
            time.sleep(1.5)
    except:
        pass

    # 5. 장소 정보 수집
    places_list = []
    places = driver.find_elements(By.CSS_SELECTOR, "li.UEzoS") 

    for place in places[:max_results]:
        try:
            # 이름 추출
            name = place.find_element(By.CSS_SELECTOR, ".TYaxG").text
            
            # 리뷰 텍스트 추출 및 숫자 파싱
            review_text = place.find_element(By.CSS_SELECTOR, ".h69wQ").text
            
            # '리뷰 1,234' 형태에서 숫자만 추출
            numbers = re.findall(r'리뷰\s*([\d,]+)', review_text)
            
            review_count = 0
            if numbers:
                # 쉼표 제거 후 정수로 변환
                review_count = int(numbers[0].replace(',', ''))
            
            places_list.append({
                'name': name,
                'review_count': review_count,
                'raw_review': review_text
            })
        except Exception as e:
            continue

    driver.quit()
    
    # 6. 파이썬 기본 기능을 이용해 리뷰 많은 순(내림차순) 정렬
    sorted_places = sorted(places_list, key=lambda x: x['review_count'], reverse=True)
    return sorted_places

# --- 실행 및 결과 저장 ---
if __name__ == "__main__":
    search_keyword = "강남역 맛집"
    print(f"'{search_keyword}' 검색 및 리뷰 데이터 수집 중 (Pandas 미사용)...")
    
    result = get_naver_map_reviews_no_pandas(search_keyword, max_results=30)
    
    if result:
        print("\n[🔥 리뷰 많은 순서 결과]")
        print("-" * 50)
        for idx, place in enumerate(result, 1):
            print(f"{idx}. {place['name']} (리뷰 수: {place['review_count']}개)")
        print("-" * 50)
        
        # 결과를 결과.csv 파일로 저장 (엑셀에서 열기 가능)
        filename = f"naver_map_results.csv"
        with open(filename, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['순위', '장소 이름', '리뷰 수', '전체 리뷰 텍스트'])
            for idx, place in enumerate(result, 1):
                writer.writerow([idx, place['name'], place['review_count'], place['raw_review']])
        
        print(f"\n수집 완료! 결과가 '{filename}' 파일로 저장되었습니다.")
    else:
        print("수집된 데이터가 없습니다. 검색어나 네이버 지도 창의 로딩 상태를 확인해 주세요.")
