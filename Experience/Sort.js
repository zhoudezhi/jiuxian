// JavaScript Document
/* 
* 数组排序
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
function Sort(arr)
{
	var temp;
	var i,j;
	for(i=0;i<arr.length;i++)
	{
		for(j=i+1;j<arr.length;j++)
		{
			if(eval(arr[i])>eval(arr[j]))
			{
				temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			
				}
			
			}	
	
	}
	return arr;
	}