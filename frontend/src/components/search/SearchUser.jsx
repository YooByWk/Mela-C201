import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { userSearch } from "../../API/UserAPI"
import DefaultUserShape from "./DefaultUserShape"
import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"


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
              <Link to={`/portfolio/${value.userIdx.emailId}`} key={value.portfolioAbstractIdx}>
                <DefaultUserShape 
                    profileImage={value.portfolio_picture_file_idx}
                    nickname={value.userIdx.nickname}
                    // onClick={(event) => Navi(`/portfolio/${value.userIdx.emailId}`)}
                />
                </Link>
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
  justify-content: flex-start;
  padding: 3% 7%;
  gap: 13%;
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