#include <wiringPi.h>
#include <softTone.h>
#include <stdio.h>

#define BuzPin    0

int main(int argc, char **argv)
{
    if(wiringPiSetup() == -1){ //when initialize wiring failed,print messageto screen
        printf("setup wiringPi failed !");
        return 1;
    }

    if(softToneCreate(BuzPin) == -1){
        printf("setup softTone failed !");
        return 1;
    }


    int o = 0;
    for (int k = 0; argv[1][k] != '\0'; ++k) {
        o *= 10; o += argv[1][k] - '0';
    }

    printf("Play %d ...\n", o);
    softToneWrite(BuzPin, o);
    delay(1000);

    return 0;
}
