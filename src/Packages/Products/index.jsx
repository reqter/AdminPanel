import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import "./styles.scss";
import Tree from "./tree";
import DataEntry from "./DataEntry";

let data = [
  {
    id: "1",
    name: "Sport",
    description: "Lorem ipsum dolor sit amet, consectetur",
    children: [
      {
        id: "2",
        parentId: "1",
        name: "Football",
        description: "Lorem ipsum dolor sit amet, consectetur",
        children: [
          {
            id: "3",
            parentId: "2",
            name: "Football",
            description: "Lorem ipsum dolor sit amet, consectetur"
          },
          {
            id: "4",
            parentId: "2",
            name: "Beach",
            description: "Lorem ipsum dolor sit amet, consectetur"
          },
          {
            id: "5",
            parentId: "2",
            name: "Footsall",
            description: "Lorem ipsum dolor sit amet, consectetur"
          }
        ]
      },
      {
        id: "6",
        parentId: "1",
        name: "Wresling",
        description: "Lorem ipsum dolor sit amet, consectetur"
      }
    ]
  },

  {
    id: "7",
    name: "Economic",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "8",
    name: "Political",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "9",
    name: "Accidents",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "10",
    name: "Others",
    description: "Lorem ipsum dolor sit amet, consectetur"
  }
];

const Products = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;
  const [treeData, setTreeData] = useState(data);
  const [dataEntryBox, toggleDataEntryBox] = useState(false);
  const [gridData, setGridData] = useState(makeData());

  function makeData(len = 5553) {
    return range(len).map(d => {
      return {
        ...newPerson(),
        children: range(10).map(newPerson)
      };
    });
  }
  function newPerson() {
    const statusChance = Math.random();
    return {
      firstName: "saeed",
      lastName: "padyab",
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? "relationship"
          : statusChance > 0.33
          ? "complicated"
          : "single"
    };
  }
  function range(len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (
    <>
      <div className="p-wrapper">
        <div className="p-header">
          <div className="p-header-left">
            <span className="p-header-title">{pageTitle}</span>
            <span className="p-header-description">{pageDescription}</span>
          </div>
          <div className="p-header-right" />
        </div>
        <div className="p-content">
          <div className="p-content-left">
            <Tree data={treeData} />
          </div>
          <div className="p-content-right">
            <div className="p-content-right-header" />
            <div className="p-content-right-body">
              <ReactTable
                data={gridData}
                defaultPageSize={10}
                minRows={3}
                columns={[
                  {
                    Header: "Name",
                    columns: [
                      {
                        Header: "First Name",
                        accessor: "firstName"
                      },
                      {
                        Header: "Last Name",
                        id: "lastName",
                        accessor: d => d.lastName
                      }
                    ]
                  },
                  {
                    Header: "Info",
                    columns: [
                      {
                        Header: "Age",
                        accessor: "age"
                      }
                    ]
                  }
                ]}
                defaultPageSize={20}
                style={{
                  height:"100%", // This will force the table body to overflow and scroll, since there is not enough room
                }}
              />
            </div>
          </div>
        </div>
        {/* {dataEntryBox && <DataEntry />} */}
      </div>
    </>
  );
};

export default Products;
