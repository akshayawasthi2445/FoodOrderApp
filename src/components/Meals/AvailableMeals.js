import { useEffect,useState } from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);//for handling the loading state.
  const [httpError,sethttpError] = useState(null);

  useEffect(()=>{
    const fetchMeals = async () => {
      const response = await fetch('https://custom-http-fetch-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!!');
      }

      const responseData = await response.json();// this response that we gotten is object data, so we will now convert it to arrayData
      
      
      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    try{
      fetchMeals().catch(error => {
        setIsLoading(false);
        sethttpError(error.message);
      });
    }catch(error){
      // the hard coded message written as "something went wrong" will be stored in the message property of the error object.
    }// try catch block is for handling any error occured in the application or the data fetching.
      
    
  },[]);
  
  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }//useEffect is called for the data fetching for the first time when the app is loaded, or when the data from the database changes.
  
  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError }</p>
    </section>
  }
  
  const mealsList = meals.map((meal) => (
    <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
