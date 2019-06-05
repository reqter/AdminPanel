import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "./../../hooks";
import { useGlobalState } from "./../../services";
import ListItem from "./ListItem";
import ItemSkeleton from "./ItemSkeleton";
import "./styles.scss";

const MarketPlace_List = props => {
  const { appLocale } = useLocale();
  const [{ spinner, mp_requests }] = useGlobalState();

  function handleItemClicked(data) {
    if (props.onListItemClicked) props.onListItemClicked(data);
  }
  function handleRequestButtonClicked(data) {
    if (props.onRequestButtonClicked) props.onRequestButtonClicked(data);
  }

  return (
    <div className="mp-products__list__content">
      {spinner
        ? [1, 2, 3, 5, 6, 7, 8].map(item => <ItemSkeleton />)
        : mp_requests &&
          mp_requests.map(item => (
            <ListItem
              data={item}
              onItemClicked={handleItemClicked}
              onRequestButtonClicked={handleRequestButtonClicked}
            />
          ))}
    </div>
  );
};

export default MarketPlace_List;
