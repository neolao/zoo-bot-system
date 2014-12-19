#include <wiringPi.h>
#include <softTone.h>
#include <stdio.h>

#define BuzPin    0

int main(int argc, char **argv)
{
        int o = 0;
        for (int k = 0; argv[1][k] != '\0'; ++k) {
            o *= 10; o += argv[1][k] - '0';
        }

        printf("Play %d ...\n", o);
        softToneWrite(BuzPin, o);
        delay(1000);

        return 0;
}
