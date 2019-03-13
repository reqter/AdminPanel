import React, { useEffect, useState, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import "./styles.scss";
import Tree from "./Categories";

let categories_data = [
  {
    id: "1",
    name: "Sport",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category",
    children: [
      {
        id: "2",
        parentId: "1",
        name: "Football",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "category",
        children: [
          {
            id: "3",
            parentId: "2",
            name: "Football",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category",
            children: [
              {
                id: "111",
                name: "Car",
                description: "Lorem ipsum dolor sit amet, consectetur",
                type: "contentType",
                fields: [
                  {
                    id: "34443",
                    name: "brand",
                    title: "Brand",
                    type: "string",
                    description: "Lorem ipsum dolor sit amet, consectetur"
                  }
                ]
              },

              {
                id: "711",
                name: "Home",
                description: "Lorem ipsum dolor sit amet, consectetur",
                type: "contentType"
              }
            ]
          },
          {
            id: "4",
            parentId: "2",
            name: "Beach",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category"
          },
          {
            id: "5",
            parentId: "2",
            name: "Footsall",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category"
          }
        ]
      },
      {
        id: "6",
        parentId: "1",
        name: "Wresling",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "category"
      }
    ]
  },

  {
    id: "7",
    name: "Economic",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "8",
    name: "Political",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "9",
    name: "Accidents",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "10",
    name: "Others",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  }
];

const table_data = [
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  },
  {
    thumbnail:
      "https://myresources1195.blob.core.windows.net/images/banana.jpg",
    name: "موز ممتاز",
    description: "محصولات وارداتی از افریقا",
    price: "2500 $",
    brand: "Banana"
  }
];
const Products = props => {
  let baseFieldColumnsConfig = [
    {
      Header: "#",
      //show: false,
      width: 70,
      headerStyle: {
        display: "none"
      },
      Cell: props => {
        return (
          <div className="p-number">
            <div className="p-number-value">{props.index + 1}</div>
          </div>
        );
      }
    },
    {
      width: 100,
      Header: "Image",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "thumbnail",
      Cell: props => (
        <div className="p-image">
          <img className="p-image-value" src={props.value} alt="" />
        </div>
      )
    },
    {
      Header: "Name",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "name",
      Cell: props => <div className="p-name">{props.value}</div>
    },
    {
      Header: "Price",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "price",
      Cell: props => <div className="p-price">{props.value}</div>
    },
    {
      Header: "Description",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "description",
      Cell: props => <div className="p-description">{props.value}</div>
    },

    {
      Header: "Actions",
      //show: false,
      headerStyle: {
        display: "none"
      },
      Cell: props => (
        <div className="p-actions">
          <button
            className="btn btn-light"
            onClick={() => handleDeleteRow(props)}
          >
            Edit
          </button>
          <button
            className="btn btn-light"
            onClick={() => handleEditRow(props)}
          >
            <i className="icon-bin" />
          </button>
        </div>
      )
    }
  ];

  // variables
  const tableBox = useRef(null);
  const { name: pageTitle, desc: pageDescription } = props.component;
  const [treeData, setTreeData] = useState(categories_data);
  const [gridData, setGridData] = useState(table_data);

  const [listContent, toggleListContent] = useState(true);
  const [leftContent, toggleLeftContent] = useState(false);
  const [tableHeaderTitle, setTableHeaderTitle] = useState("");

  const [selectedCategory, setSelectedGategory] = useState();
  const [columnsVisibility, toggleColumns] = useState(false);

  const [columns, setColumns] = useState(baseFieldColumnsConfig.slice());

  // methods

  function initColumns() {
    if (columnsVisibility) {
      const cols = baseFieldColumnsConfig.map(col => {
        let item = col;
        item.headerStyle.display = "none";
        return item;
      });
      setColumns(cols);
      toggleColumns(true);
    }
  }

  function toggleFilterBox() {
    toggleLeftContent(prevState => !prevState);
  }
  function openNewItemBox() {
    props.history.push("/addNew");
  }
  function makeTableFieldView(type, props) {
    switch (type) {
      case "string":
        return <div className="p-string">{props.value}</div>;
        break;
      default:
        return <div className="p-string">{props.value}</div>;
        break;
    }
  }
  function handleClickCategoryContent(selected) {
    setSelectedGategory(selected);
    setTableHeaderTitle(selected.name);
    // if (selected.type === "category") {
    //   initColumns();
    // } else {
    //   if (selected.fields) {
    //     toggleColumns(true); // columns are visible or not

    //     const cols = columns.slice();
    //     let c_arr = cols.map(col => {
    //       let item = col;
    //       item.headerStyle.display = "flex";
    //       return item;
    //     });
    //     const fields = selected.fields;
    //     for (let i = 0; i < fields.length; i++) {
    //       const field = selected.fields[i];
    //       const obj = {
    //         Header: field.title,
    //         //show: false,
    //         headerStyle: {
    //           display: "block"
    //         },
    //         accessor: field.name,
    //         Cell: props => {
    //           return makeTableFieldView(field.type, props);
    //         }
    //       };
    //       c_arr.push(obj);
    //     }
    //     setColumns(c_arr);
    //   } else {
    //     initColumns();
    //   }
    // }
  }
  function handleDeleteRow(row) {
    console.log(row);
  }
  function handleEditRow(row) {
    console.log(row);
  }
  return (
    <>
      <div className="p-wrapper">
        <div className="p-header">
          <div className="p-header-left">
            <span className="p-header-title">{pageTitle}</span>
            <span className="p-header-description">{pageDescription}</span>
          </div>
          <div className="p-header-right">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search in all data"
              />
            </div>
            <button className="btn btn-primary">
              <i className="icon-folder" />
            </button>
            <button className="btn btn-primary">
              <i className="icon-list" />
            </button>
            <button className="btn btn-primary" onClick={toggleFilterBox}>
              <i className="icon-filter" />
            </button>
            <button className="btn btn-primary" onClick={openNewItemBox}>
              New Item
            </button>
          </div>
        </div>
        <div className="p-content">
          {listContent && (
            <>
              {leftContent && (
                <div className="p-content-left animated zoomIn faster">
                  <Tree
                    leftContent={leftContent}
                    data={treeData}
                    onContentSelect={selected =>
                      handleClickCategoryContent(selected)
                    }
                  />
                </div>
              )}
              <div className="p-content-right" ref={tableBox}>
                <div className="p-content-right-header">
                  <div className="p-content-header-title">
                    All Data
                    {tableHeaderTitle.length > 0 ? (
                      <span>({tableHeaderTitle})</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="p-content-right-body">
                  <ReactTable
                    data={gridData}
                    defaultPageSize={10}
                    minRows={3}
                    columns={columns}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    style={{
                      overflowX: "auto",
                      height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
