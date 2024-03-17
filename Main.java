import java.util.Scanner;
// import java.lang.*;
class Main{
  final static char signs[]={'/','*','+','-'};
  private static String calculateReal(String s, int p, int q, int r)
  {
    int a=Integer.parseInt(s.substring(p,q));
    int b=Integer.parseInt(s.substring(q+1,r));
    int c=0;
    if(s.charAt(q)=='+')
      c=a+b;
    else if(s.charAt(q)=='-')
      c=a-b;
    else if(s.charAt(q)=='*')
      c=a*b;
    else if(s.charAt(q)=='/')
      c=a/b;
    return c+"";
  }
  private static String trimAllSpaces(String s)
  {
    String res="";
    for(int a=0;a<s.length();a++)
      {
        if(s.charAt(a)!=32)
          res+=s.charAt(a);
      }
    return res;
  }
  private static String calculate(String s)
  {
    //for checking brackets//////////////////////////////
    int start=-1;//flag to check if starting bracket was found
    int end=s.length();
    String ans=s;
    int count=0;
    for(int a=0;a<s.length();a++)
      {
        if(s.charAt(a)=='(')
        {
          if(start==-1)
            start=a;
          count++;
        }
        else if(start!=-1&&s.charAt(a)==')')
        {
          count--;
          end=a;
        }
        if(start!=-1&&count==0)
        {
          System.out.println("Values of start and end are:"+start+" "+a);
          ans="";
          // count=0;
          if(start!=0)
            ans=s.substring(0,start);
          ans+=calculate(s.substring(start+1,a));
          if(a!=s.length()-1)
              ans+=s.substring(a+1,s.length());

          // //checking for more brackets
          // for(int c=a+1;c<s.length();c++)
          //   if(s.charAt(c)=='(')
          //     count++;

          s=ans;
          break;
        }
        
      }
   ////////////////////////////////////////////////////////
    
    int p,q,r;
    // String result="";
    for(int a=0;a<signs.length;)
      {
        System.out.println("Checking for "+signs[a]);
        q=checkforSign(s,a);
        if(q!=-1)
        {
          p=getBefore(s,q);
          r=getAfter(s,q);
          String temp=calculateReal(s,p,q,r);
          if(p==0&&r==s.length())
            s=temp;
          else if(p==0)
            s=temp
            +s.substring(r,s.length());
          else if(r==s.length())
            s=s.substring(0,p)+temp;
          else
            s=s.substring(0,p)
            +temp+s.substring(r,s.length());
        }
        else
        {
          a++;
        }
        System.out.println("s so far: "+s);
      }
    return s;
  }
  private static int checkforSign(String s, int signIndex)
  {
    char c=signs[signIndex];
    int index=-1;
    for(int a=1;a<s.length()-1;a++)
      {
        if(s.charAt(a)==c&&isNum(s.charAt(a-1))&&isNum(s.charAt(a+1)))
        {
          return a;
        }
      }
    return index;
  }
  private static boolean isNum(char c)
  {
    if(c>=48&&c<=57)
      return true;
    else
      return false;
  }
  private static int getBefore(String s,int signIndex)
  {
    int p=0;
    for(int a=signIndex-1;a>0;a++)
      {
        if(isNum(s.charAt(a))&&!isNum(s.charAt(a-1)))
        {
          p=a;
          break;
        }
      }
    return p;
  }
  private static int getAfter(String s,int signIndex)
  {
    int r=s.length();
    for(int a=signIndex+1;a<s.length()-1;a++)
      {
        if(isNum(s.charAt(a))&&!isNum(s.charAt(a+1)))
        {
          r=a+1;
          break;
        }
      }
    return r;
  }
  public static void main(String args[])
  {
    Scanner sc=new Scanner(System.in);
    System.out.println("Hey, this program calculates arithmetic operations you enter. For example, 2*3+7/13\ntype your input below_");
    String s="";
    // while(!input.toUpperCase().equals("stop"))
      // {
          int p,q,r;
          s=sc.next();
          s=trimAllSpaces(s);
          q=checkforSign(s,0);
          p=getBefore(s,q);
          r=getAfter(s,q);
          System.out.println("\n Indices = "+p+" "+q+" "+r);
        System.out.println("\n Result = "+calculate(s));
      // }
    sc.close();
  }
}
