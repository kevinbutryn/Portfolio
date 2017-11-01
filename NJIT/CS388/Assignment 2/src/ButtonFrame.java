import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.*;

public class ButtonFrame extends JFrame{

	private JButton plainJButton;
	private JButton fancyJButton;
	
	public ButtonFrame()
	{
		super("Testing Buttons" );
		setLayout( new FlowLayout());
		
		plainJButton = new JButton ("PLain Button");
		add ( plainJButton);
		
		Icon bug1 = new ImageIcon(getClass().getResource("bug1.jpg"));
		Icon bug2 = new ImageIcon(getClass().getResource("bug2.jpg"));
		fancyJButton = new JButton("Fancy Button", bug1);
		fancyJButton.setRolloverIcon(bug2);
		add(fancyJButton);
		
		ButtonHandler handler = new ButtonHandler();
		fancyJButton.addActionListener(handler);
		plainJButton.addActionListener(handler);
	}
	
	private class ButtonHandler implements ActionListener
	{
		public void actionPerformed(ActionEvent event)
		{
			JOptionPane.showMessageDialog(ButtonFrame.this, String.format("you pressed : %s", event.getActionCommand()));
		}
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		
	}

}
