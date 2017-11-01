import java.util.*;
import java.util.Scanner;
public class problem1e {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		TreeSet<String> tree = new TreeSet<String>();
		Scanner scan = new Scanner(System.in);
		System.out.println("input a string: ");
		String sentence = scan.nextLine();
		String[] words = sentence.split(" ");
		
		for (int x=0;x<= words.length-1; x++)
		tree.add(words[x]);
		
		Iterator<String> itr = tree.iterator();
		while(itr.hasNext()) {
			System.out.println(itr.next());
		}
	}
}
