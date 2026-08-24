import java.io.File;
import java.io.IOException;

/**
 * 파일 API 예제는 각 클래스의 main 메서드를 실행해 볼 수 있습니다.
 * 예: Example01CreateFile
 */
public class App {
    public static void main(String[] args) throws IOException {
        File file = new File("d:\\example.txt");
        File tempFile = new File("temp.txt");
        if (file.exists()) {
            System.out.println("파일이 존재합니다.");
        } else {
            System.out.println("파일이 존재하지 않습니다.");
        }

        if (tempFile.exists()) {
            System.out.println("임시 파일이 존재합니다.");
        } else {
            System.out.println("파일이 존재하지 않습니다.");
        }
        
        File folder = new File("d:\\example_folder");

        if (folder.exists()) {
            System.out.println("폴더가 존재합니다.");
        } else {
            System.out.println("폴더가 존재하지 않습니다.");
        }
        File tempFolder = new File("temp_folder");

        if (tempFolder.exists()) {
            System.out.println("임시 폴더가 존재합니다.");
        } else {
            System.out.println("임시 폴더가 존재하지 않습니다.");
        }
    }
}

