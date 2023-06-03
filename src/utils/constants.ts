export default class Constants {
  private static GetWebHost = () => {
    if(process.env.NODE_ENV === 'development'){
      return 'http://localhost:3000';
    }
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  public static readonly WebHost = Constants.GetWebHost();
}