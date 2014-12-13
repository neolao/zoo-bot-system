#include <wiringPi.h>
#include <stdio.h>

#define SensorPin          0

int main(void)
{
    if(wiringPiSetup() == -1){
        printf("setup wiringPi failed !");
        return 1; 
    }

    pinMode(SensorPin, INPUT);

    while (1) {

        if (digitalRead(SensorPin) == 0) {
            delay(25);
            if (digitalRead(SensorPin) == 0) {
                printf("Detected Barrier !\n");
                delay(500);
                printf("\n\n\n");
            }
        }
    }

    return 0;
}

