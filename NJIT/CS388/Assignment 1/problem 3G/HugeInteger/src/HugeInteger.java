
public class HugeInteger {

	int[] digits = new int[40];
	int num_length = 0;
	boolean isNegative = false;
	
	public HugeInteger(String num) {
		parse(num);
	}
	
	public void parse(String num) {
		
		num_length = num.length();
		int y=0;
		for (int x = num_length-1; x >= 0;x--) {
			digits[y] = (int)(num.charAt(x)-'0'); 
			y++;
		}
	}
	
	public void update()
	{
		String number = toString();
		num_length = number.length();
		if (number.charAt(num_length-1) == '-');
		{
			num_length -= 1;
			isNegative = true;
		}
		
		System.out.println("the length is now "+ num_length);
	}
	
	public String toString() {
		String answer = "";
		
		for (int x = 0; x < 40;x++) {
			
			//if (x % 3 == 0) {
		//		if(x != 0) {
			//	answer = "," + answer;}
			//}
			answer = (digits[x]) + answer;
		}
		
		answer = answer.replaceFirst ("^0*", "");
		
		if (isNegative == true)
			answer = "-" + answer;
		
		if (answer.isEmpty()) 
			answer = "0";
		return answer;
	}
	
	public void add(HugeInteger number) {
	
		
		if (isNegative != number.isNegative)
		{
				number.isNegative = !number.isNegative;
				subtract(number);
				number.isNegative = !number.isNegative;
		}
		
		
		for(int x = 0; x < 40; x++) {
			
			digits[x] += number.digits[x];
			
			
			if (digits[x] > 9) {
				
				digits[x] -= 10;
				if((x+1) == 40) {
					System.out.println("ERROR: number will exceed 40 digits");
				}
				else {
				digits[x+1] += 1;
				}
			}
		}
		update();
	}
	
	public void subtract(HugeInteger number) {
		int bound;
		
		if (isNegative != number.isNegative)
		{
				number.isNegative = !number.isNegative;
				add(number);
				number.isNegative = !number.isNegative;
		}
		
		if (isGreaterThan(number))
		{
			for(int x = 0; x <= num_length; x++) {
				digits[x] = digits[x] - number.digits[x];
				
				if (digits[x] < 0) {
					
					if ((x+1) <= num_length)
						{
						update();
						break;
						}
					else
					{
					digits[x] += 10;
					
					
					if((x+1) == 40) {
						System.out.println("ERROR: number will exceed 40 digits");
					}
					else {
					digits[x+1] -= 1;
					}
					}
				}
			}
		}
		else
		{
			for(int x = 0; x <= number.num_length; x++) {
				digits[x] = digits[x] - number.digits[x];
				}
			for(int x = 0; x <= number.num_length; x++)
			{
				if (digits[x] > 0) {
					digits[x] -= 10;
					digits[x+1] += 1;	
				}
				
				
					digits[x] = digits[x] * (-1);
					
			}
			isNegative = !isNegative;
		}
	}
	
	public boolean isEqualTo(HugeInteger number) {
		if (num_length != number.num_length) {
			return false;
		}
		
		for(int x = 0; x < 40; x++) {
			if (digits[x] != number.digits[x])
			{
				return false;
			}
		}
		return true; 
	}
	
	public boolean isGreaterThan(HugeInteger number) { 
		if (isNegative != number.isNegative) {
			return number.isNegative;
		}
		
		if (num_length > number.num_length) {
			return true;
		}
				
		for (int x = num_length-1; x >= 0;x--) {
			if (digits[x] < number.digits[x])
				return false;
		}
		if (digits[0] == number.digits[0])
			return false;
		return true;
	}
	
	public boolean isLessThan(HugeInteger number) { 
		if (isNegative != number.isNegative) {
			return isNegative;
		}
		if (num_length < number.num_length) {
			return true;
		}
		
		for (int x = num_length-1; x >= 0;x--) {
			if (digits[x] > number.digits[x])
				return false;
		}
		if (digits[0] == number.digits[0])
			return false;
		return true;
	}
	
	public boolean isGreaterThanOrEqualTo(HugeInteger number) {
		
		if ((isGreaterThan(number))||isEqualTo(number))
			return true;
		return false;
	}
	
	public boolean isLessThanOrEqualTo(HugeInteger number) {
		if ((isLessThan(number))||isEqualTo(number))
			return true;
		return false;
	}
	
	public boolean isZero() {
		
		for(int x = 0; x < 40; x++) {
			if (digits[x] != 0 )
			{
				return false;
			}
		}
		
		return true;
	}
}
