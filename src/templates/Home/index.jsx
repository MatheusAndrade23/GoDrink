import * as Styled from './styles';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCocktail } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { TextComponent } from '../../components/TextComponent';
import { LinkComponent } from '../../components/LinkComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { SmallContainer } from '../../components/SmallContainer';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { RandomDrinkComponent } from '../../components/RandomDrinkComponent';

import config from '../../config';
import popularDrinks from './popular-drinks.js';

export const Home = () => {
  document.title = `Home | ${config.siteName}`;
  return (
    <>
      <Header />
      <Styled.HomeContainer>
        <Styled.Init>
          <img
            src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
          <SmallContainer>
            <Styled.Title>Welcome to GODRINK</Styled.Title>
            <TextComponent size="medium">
              An open source website with over 600 different cocktails recipes
              <br />
              from around the world.
            </TextComponent>
            <Styled.Info>
              <SmallContainer disposition="row">
                <FaCocktail />
                <p>Total Cocktails: 635</p>
              </SmallContainer>
              <SmallContainer disposition="row">
                <GiFruitBowl />
                <p>Total Ingredients: 488</p>
              </SmallContainer>
            </Styled.Info>
          </SmallContainer>
          <img
            src="https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
        </Styled.Init>
        <Styled.SecTitle>Popular Drinks:</Styled.SecTitle>
        <Styled.RandomDrinks>
          {popularDrinks.drinks.map((drink) => (
            <DrinkComponent drink={drink} key={drink.idDrink} />
          ))}
        </Styled.RandomDrinks>
        <Styled.SecTitle>Random Drinks:</Styled.SecTitle>
        <Styled.RandomDrinks>
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
        </Styled.RandomDrinks>
      </Styled.HomeContainer>
    </>
  );
};
