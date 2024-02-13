import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { userSearch } from "../../API/UserAPI"
import DefaultUserShape from "./DefaultUserShape"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

function SearchUser() {
    const { word } = useParams()
    const [values, setValues] = useState([])
    const Navi = useNavigate()

    useEffect(() => {
        const info = async() => {
            try {
                // console.log(word)
                const searchInfo = await userSearch(word)
                setValues(searchInfo)
            } catch (err) {
                console.log(err)
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
                <DefaultUserShape 
                    key={value.portfolioAbstractIdx}
                    profileImage={value.portfolio_picture_file_idx}
                    nickname={value.userIdx.nickname}
                    //   onClick={(event) => Navi(`/portfolio/${value.userIdx.emailId}`)}
                />
            ))}
          </>
          )}
      </SearchContainer>
    )
}

export default SearchUser

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 3%;
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