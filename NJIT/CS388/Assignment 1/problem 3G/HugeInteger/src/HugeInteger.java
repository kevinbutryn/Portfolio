
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
		if (answer.isEmpty()) 
			answer = "0";
		return answer;
	}
	
	public void add(HugeInteger number) {
	
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
		
		
		if(num_length > number.num_length)
			bound  = num_length;
		else
			bound = number.num_length;
		
		
		for(int x = 0; x <= bound; x++) {
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
