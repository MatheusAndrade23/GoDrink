import * as Styled from '../Lists/styles';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { GetFavorites } from '../../utils/get-favorites';
import { AuthContext } from '../../providers/AuthProvider/index';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const Favorites = () => {
  const { user, updateFavorites } = useContext(AuthContext);
  const navigate = useNavigate();
  const DRINKS_PER_PAGE = 8;

  const [loadMoreControl, setLoadMoreControl] = useState(DRINKS_PER_PAGE);
  const [drinksToShow, setDrinksToShow] = useState([]);
  const [next, setNext] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [loadingControl, setLoadingControl] = useState(true);
  const [errorControl, setErrorControl] = useState({
    error: false,
    message: '',
  });

  const handleShowMoreDrinks = () => {
    const nextPage = next + DRINKS_PER_PAGE;
    const nextDrinks = drinks.slice(nextPage, nextPage + DRINKS_PER_PAGE);
    setDrinksToShow([...drinksToShow, ...nextDrinks]);
    setNext(nextPage);
    setLoadMoreControl((loaded) => loaded + DRINKS_PER_PAGE);
  };

  useEffect(() => {
    (async () => {
      if (!user.authenticated) {
        setErrorControl({
          error: true,
          message:
            'Please create an account or log in before having a list of favorite drinks!',
        });
        return;
      }
      const favorites = await GetFavorites(user.favorites);
      setDrinks(favorites);
    })();
  }, [navigate, updateFavorites, user]);

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      setDrinksToShow(drinks.slice(0, DRINKS_PER_PAGE));
      setLoadingControl(false);
      document.title = `Favorites | ${config.siteName} `;
    } else if (drinks === null) {
      setLoadingControl(false);
      setErrorControl({
        error: true,
        message: 'You do not have any favorite drink!',
      });
      document.title = `Favorites | ${config.siteName} `;
    } else if (drinks === undefined) {
      setErrorControl({
        error: true,
        message: 'Something went wrong, try again later!',
        code: 500,
      });
      document.title = `Server Error | ${config.siteName} `;
    }
  }, [drinks]);

  return (
    <>
      <Header />
      {!errorControl.error ? (
        <Styled.Container>
          <Heading size="small" as="h4">
            Favorite Drinks:
          </Heading>
          {!loadingControl ? (
            <Styled.DrinksContainer>
              {drinksToShow.map((drink) => (
                <DrinkComponent drink={drink} key={drink.idDrink} />
              ))}
            </Styled.DrinksContainer>
          ) : (
            <Styled.DrinksContainer>
              <Loading />
            </Styled.DrinksContainer>
          )}
          {drinks && drinks.length > 0 && loadMoreControl < drinks.length && (
            <ButtonComponent handleSubmit={handleShowMoreDrinks} bold={false}>
              Load More
            </ButtonComponent>
          )}
        </Styled.Container>
      ) : (
        <ErrorComponent
          message={errorControl.message}
          code={errorControl.code}
        />
      )}
      <ReturnButton />
    </>
  );
};
