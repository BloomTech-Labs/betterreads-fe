import React from "react";
import { connect } from 'react-redux';
import { Event } from "../tracking";
import { Row, Col, Avatar } from "antd";
import styled from "styled-components";

import { signOut } from '../../actions'

const Wrapper = styled.div`
    padding: 0.5rem 0;
    
    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`;

const Header = props => {
    return (
        <>
            <Wrapper>
                <Row
                    type='flex'
                    justify='center'
                    align='middle'
                    gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
                >
                    <Col span={11}>
                        <div
                            className='fs-18'
                            style={{ height: "42px", lineHeight: "42px" }}
                        >
                            BetterReads
                        </div>
                    </Col>
                    <Col span={2} offset={9}>
                        
                        {(!localStorage.getItem('image') ||
                            localStorage.getItem('image') === 'null') && (
                                <Avatar icon='user' size='small' />
                        )}

                        {localStorage.getItem("image") &&
                            localStorage.getItem("image") !== "null" && (
                                <img
                                    src={localStorage.getItem("image")}
                                    alt='profile icon'
                                    onClick={() => props.signOut(props.history)}
                                />
                            )}
                    </Col>
                </Row>
            </Wrapper>
        </>
    );
};

//export default Header;
export default connect(null, {signOut})(Header);
