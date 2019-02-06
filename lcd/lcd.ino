#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
int Contrast = 75;
String str;
String str2;
int delay1 = 3000;

void setup()
{
  analogWrite(6, Contrast);
  Serial.begin(9600);
  lcd.begin(16, 2);
}

void loop()
{
  if (Serial.available())
  {
     str = Serial.readString();
     //Serial.println(str);
     if (str[0] == 'd' && str[1] == '-')
     {
      if (str[2] == '-' && delay1 > 1000)
        delay1 = delay1 - 1000;
      else if (str[2] == '+' && delay1 < 9000)
        delay1 = delay1 + 1000;


       //Serial.println(delay1);
     }
     else {
      splitText(str);
     }
     
     Serial.println("OK");
  }
}

void sendText(String str)
{
       lcd.clear();
       if(str.length() > 16)
       {
         str2 = str.substring(16);
         lcd.print(str);
    
         lcd.setCursor(0, 1);
         lcd.print(str2);
       }
       else
       {
          lcd.print(str);
       }
}

void splitText(String text)
{
   int length1 = text.length();
   String str = "";
   int i = 0;

   if (length1 > 32)
   {
    while (length1 > 32)
    {
      str = text.substring(i,i+32);

      sendText(str);
      //Serial.print("ass ");
      //Serial.println(str);
      delay(delay1);

      i = i + 32;
      length1 = length1 - 32;
    }

    str = text.substring(i);
    sendText(str);
    //Serial.print("b ");
    //Serial.println(str);
   
   }
   else
   {
    sendText(text);
    //Serial.print("c ");
    //Serial.println(text);
   }
}
