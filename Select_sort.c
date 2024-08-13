// 选择排序

#include <stdio.h>

int main()
{
    // 假定数组
    int arr[6] = {1213, 453, 534, 5643, 24, 23};

    //前进角标、临时交换变量
    int fwd, temp;

    // 对数组进行选择排序
    for (int i = 0; i < 6; i++)
    {
        //记录最小元素角标
        int min = i;
        //使用前进角标进行逐一比较
        for ( fwd = i+1; fwd < 6; fwd++)
        {
            //比较判定
            if (arr[fwd] < arr[min])
            {
                //更新最小元素角标
                min = fwd;
            }
        }

        //将最小的元素交换到最后
        if (min != i)
        {
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    
    // 遍历输出
    for (int i = 0; i < 6; i++)
    {
        printf("%d\t", arr[i]);
    }

    return 0;
}