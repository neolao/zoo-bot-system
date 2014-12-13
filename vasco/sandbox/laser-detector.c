#include <wiringPi.h>
#include <stdio.h>

#define LaserPin          0
#define LightBreakPin     1

int main(void)
{
    if(wiringPiSetup() == -1){
        printf("setup wiringPi failed !");
        return 1; 
    }

    pinMode(LaserPin, OUTPUT);
    pinMode(LightBreakPin, INPUT);

    int last = LOW;
    int now;

    digitalWrite(LaserPin, HIGH);
    while (1) {
        now = digitalRead(LightBreakPin);
        if (now == HIGH && last == LOW) {
            printf("BOUM !\n");
            last = now;
        }
        if (now == LOW && last == HIGH) {
            printf("...\n\n\n\n\n\n\n\n");
            last = now;
        }

        //delay(100);
    }

    return 0;
}

