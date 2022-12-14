import { useContext, useEffect } from 'react';
import { SearchContext } from './providers';
import { useRouter } from 'next/router';
import { framelyApi } from "services";


export function useSearchContext(){
	const {
		inputData,
		inputDebounce,
		setInputData,
		isTyping,
		setIsTyping,
		typeAhead,
		setTypeAhead,
		queriesSuggestions,
		setQueriesSuggestions
	} = useContext(SearchContext);


// =============================================================

	const router = useRouter();

  const selectTypeAhead = (option:string):void => {
    setInputData(option);
    setIsTyping(false);
    setTypeAhead([]);
  }

  const filterSearch = async (value:string):Promise<void> => {
    if (value.length > 0 && isTyping) {
      setTypeAhead(await framelyApi.advancedtypeAhead(value).then(r => r.data));
    } else if (!value.length && isTyping) {
    	router.push('/');
    } else {
      setTypeAhead([]);
    }
  }

  useEffect(() => {
  	framelyApi.images_queries({ totalResult: 8 }).then(r => {
  		setQueriesSuggestions(r.data);
  	});
  }, []);

  useEffect(() => {
    filterSearch(inputDebounce);
  }, [inputDebounce]);


	return {
		inputData,
		setInputData,
		isTyping,
		setIsTyping,
		typeAhead,
		setTypeAhead,
		selectTypeAhead,
		filterSearch,
		queriesSuggestions
	}
}
