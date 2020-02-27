import React from 'react';
import { Event } from '../tracking';
import { Row, Col, Avatar } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: .5rem 0;
`;

const Header = () => {
    return (
        <>
            <Wrapper>
                <Row type="flex" justify="center" align="middle" gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                    <Col span={11}>
                        <div className="fs-18" style={{height: '42px', lineHeight: '42px'}}>BetterReads</div>
                    </Col>
                    <Col span={2} offset={9}>
                        <Avatar icon="user" size="small" />
                    </Col>
                </Row>
            </Wrapper>
        </>
    )
}

export default Header;