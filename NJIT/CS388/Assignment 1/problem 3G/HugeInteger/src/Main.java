import java.util.*;

public class Main {

	public static void main(String[] args) {
		String number1 = "";
		String number2 = "";
		int length = 41;
		
		System.out.println("enter two numbers A and B");
		Scanner scan = new Scanner(System.in);
		
		while (length > 40) {
		System.out.print("Enter number A (limit 40 digits): ");
		number1 = ((scan.nextLine()));
		length = number1.length();
		}
		
		length = 41;
		
		while (length > 40) {
		System.out.print("Enter number B (limit 40 digits): ");
		number2 = ((scan.nextLine()));
		length = number2.length();
		}
		
		HugeInteger num1 = new HugeInteger(number1);
		HugeInteger num2 = new HugeInteger(number2);
		
		System.out.printf("Number A equals: %s\n",num1.toString());
		System.out.printf("Number B equals: %s\n",num2.toString());
		System.out.println();
		
		
		num1.add(num2);
		System.out.printf("A + B equals: %s\n", num1.toString());
		System.out.println();
		System.out.printf("Number A equals: %s\n",num1.toString());
		System.out.printf("Number B equals: %s\n",num2.toString());
		System.out.println();
		
		
		num1.subtract(num2);
		System.out.printf("A - B equals: %s\n", num1.toString());
		System.out.println();
		System.out.printf("Number A equals: %s\n",num1.toString());
		System.out.printf("Number B equals: %s\n",num2.toString());
		System.out.println();
		
		
		System.out.printf("A > B : %b\n", num1.isGreaterThan(num2));
		System.out.printf("A < B : %b\n", num1.isLessThan(num2));
		System.out.printf("A = B : %b\n", num1.isEqualTo(num2));
		System.out.printf("A >= B : %b\n", num1.isGreaterThanOrEqualTo(num2));
		System.out.printf("A <= B : %b\n", num1.isLessThanOrEqualTo(num2));
		System.out.printf("A = 0 :  %b\n", num1.isZero());
		System.out.println();
		
		

	}

}
