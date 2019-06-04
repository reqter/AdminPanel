import React, { useState, useEffect, useRef } from "react";
import { useTheme, useLayout, useLocale } from "./../../hooks";
import ListItem from "./ListItem";
import ItemSkeleton from "./ItemSkeleton";
import "./styles.scss";

const data = [
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img:
      "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
  },
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img: "http://www.zakcars.com/images/zakcars1.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
  },
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img:
      "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
  },
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img: "http://www.zakcars.com/images/zakcars1.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
  },
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img:
      "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
  },
  {
    _id: 1,
    sys: {
      link: "xsxs",
    },
    img: "http://www.zakcars.com/images/zakcars1.jpg",
  },
  {
    _id: 2,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
  },
  {
    _id: 3,
    sys: {
      link: "xsxs",
    },
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
  },
];

const MarketPlace_List = props => {
  const { appLocale } = useLocale();
  const [spinner, toggleSpinner] = useState(true);

  useEffect(() => {
    if (spinner)
      setTimeout(() => {
        toggleSpinner(false);
      }, 1000);
  });

  function handleItemClicked(data) {
    if (props.onListItemClicked) props.onListItemClicked(data);
  }
  function handleRequestButtonClicked() {
    if (props.onRequestButtonClicked) props.onRequestButtonClicked(data);
  }

  return (
    <div className="mp-products__list__content">
      {spinner
        ? [1, 2, 3, 5, 6, 7, 8].map(item => <ItemSkeleton />)
        : data &&
          data.map(item => (
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
