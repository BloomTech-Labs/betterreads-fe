import React from 'react';
import { Event } from '../tracking';
import { Layout, Row, Col, Icon } from 'antd';
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
                        <div className="fs-18" style={{height: '34px', lineHeight: '34px'}}>BetterReads</div>
                    </Col>
                    <Col span={11}>
                        <div style={{height: '34px', lineHeight: '34px;'}}>
                            <Icon type="user" />
                        </div>
                    </Col>
                </Row>
            </Wrapper>
        </>
    )
}

export default Header;