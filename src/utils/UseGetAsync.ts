import axios from 'axios';
import React from 'react';

export type UseGetAsyncProps = {
  Url: string;
  Query?: any;
  IsFetching: boolean;
  // Callback: ((errorMessage: string, response: HttpResponse | undefined) => Promise<void>)
  //   | ((errorMessage: string, response: HttpResponse | undefined) => void);
}

export const UseGetAsync = (props: UseGetAsyncProps) => {
  const RefIsFetching = React.useRef(false);

  React.useEffect(() => {
    const UpdateAsync = async() => {

      let response: any;
      let errorMessage: string;

      try{
        response = await axios.get(
          props.Url,
          {
            params: props.Query
          }
        );
      }catch(err: any){
        errorMessage = err.message;
        console.error(errorMessage);

        if(!response && err.response){
          response = err.response;
        }
      }

      if(response && !response.data?.Success){
        errorMessage = response?.data?.Message;
      }

      // await props.Callback(errorMessage, response);

      RefIsFetching.current = false;
    }

    if(props.IsFetching && !RefIsFetching.current){
      RefIsFetching.current = true;
      UpdateAsync();
    }
  }, [props]);
}