import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { BoardList } from "../../API/BoardAPI";
import styled from "styled-components"

function SearchCommunity() {
    const { word } = useParams()
    const [values, setValues] = useState([])

    useEffect(() => {
        const info = async() => {
            try {
                const searchInfo = await BoardList({
                  page: 1,
                  size: 10,
                  word: word,
                })
                setValues(searchInfo.data.boardResList)

            } catch (err) {
                // console.log(err)
            }
        }
        info()
        
    },[word])

    // console.log(values)
    
    return(
        <SearchContainer>
          {values.length === 0 ? (
            <>
            <H1>일치하는 검색 결과가 없습니다.</H1>
          </>
          ) : (
          <>
            {Object.entries(values).map(([key, value]) => (
              <Link to={`/community/${value.boardIdx}`} key={value.boardIdx}>
              <Div>
                <Title>
                  {value.title}
                </Title>
                <Content>
                  {value.content}
                </Content>
              </Div>
              </Link>
            ))}
          </>
          )}
      </SearchContainer>
    )
}

export default SearchCommunity

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4%;
  padding-top: 3%;
  padding-left: 5%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const H1 = styled.p`
  color: white;
`

const Div = styled.div`
  width: 250px;
  height: 200px;
  background-color: #202C44;
  border-radius: 15%;
  margin-bottom: 10%;
`

const Title = styled.div`
  color: white;
  padding-top: 20%;
  padding-left: 10%;
  padding-right: 10%;
  font-weight: bold;
  font-size: x-large;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`

const Content = styled.div`
  color: white;
  padding-top: 15%;
  padding-left: 10%;
  padding-right: 10%;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`