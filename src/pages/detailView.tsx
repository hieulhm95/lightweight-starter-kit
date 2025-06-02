import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import Link from 'next/link';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { sx } from 'clad-ui/utils';
import theme from '@clad-ui/theme';
import {
  Announcer,
  Badge,
  Button,
  ButtonLink,
  // Breadcrumbs,
  Checkbox,
  Chip,
  RadioButton,
  ShapeIcon,
  Slider,
  RowItem,
  Snack,
  Tabs,
  Tab,
  ToggleSwitch,
  Tooltip,
  Drawer,
  Dropdown,
  Input,
  CurrencyInput,
  // Popup,
  MultiSearchDropdown,
  InputGroup,
  TagCloud,
  TextArea,
  SearchInput,
  EmptyState,
  Box,
  Grid,
  Col,
} from 'clad-ui';
import { PaymentInfo } from 'clad-ui/icons';
import type { NextPageWithLayout } from './_app';

// scoped class-based CSS

const detailViewClass = css`
  background-color: ${theme.colors.background};

  ${sx({
    px: 'sm',
    py: 'lg',
  })}
`;

const buttonGroupClass = css`
  display: flex;
  align-items: center;

  & > * {
    margin-right: ${theme.space.sm};
  }
`;

// // styled component
const Title = styled.h1`
  color: ${theme.colors.accent};
`;

type Props = {
  isSSR: boolean;
};

const DetailView: NextPageWithLayout<Props> = ({ isSSR }: Props) => {
  const [valueSearch, setValueSearch] = useState([
    { data: { job: 'job A' }, html: 'Lao động phổ thông', text: 'Lao động phổ thông' },
    { data: { job: 'job B' }, html: 'Tạp vụ', text: 'Tạp vụ' },
  ]);
  const onSelect = (v) => {
    const temp = [...valueSearch, v];
    setValueSearch(temp);
  };

  const onClear = () => {
    setValueSearch([]);
  };
  const onRemoveOption = (deleted) => {
    const afterDeleteValues = valueSearch.filter((va) => va.data !== deleted.data);
    setValueSearch(afterDeleteValues);
  };
  const [value, setValue] = useState(0);
  const [valueDropdown, setValueDropdown] = useState('');
  const [term, setTerm] = useState('month');
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <section className={detailViewClass}>
      <Title>This is adview page</Title>
      <p>This page is {isSSR ? 'SSR' : 'CSR'}</p>
      <div className={buttonGroupClass}>
        <Link href="/" passHref legacyBehavior>
          <ButtonLink>Home</ButtonLink>
        </Link>
        <Link href="/testPage" passHref legacyBehavior>
          <Button color="primary" variant="outline" as="a">
            Test Page Props
          </Button>
        </Link>
      </div>
      <hr />
      {!open && <Button onClick={() => setOpen(true)}>Reopen Announcer</Button>}
      <Announcer
        btnLabel="Xem thêm"
        open={open}
        onClose={() => setOpen(false)}
        onButtonClick={() => setOpen(false)}
        type="time"
        compact
      >
        Chợ Tốt đang thực hiện nâng cấp hệ thống nên có thể ảnh hưởng tới một số tính năng liên quan
        đến quản lý và hiển thị tin đăng, chúng tôi sẽ cập nhật thông tin ngay khi hoàn thành. Xin
        lỗi Quý khách vì sự bất tiện này!
      </Announcer>
      <div>
        <Badge position="topRight" borderRadius="pill" label="999">
          <Button>Bagde</Button>
        </Badge>
        <Checkbox
          label={checked ? 'Checked' : 'Unchecked'}
          name="overview"
          onChange={() => setChecked(!checked)}
          checked={checked}
        />
        <RadioButton
          label="Unchecked"
          name="overview"
          onChange={() => setChecked(!checked)}
          value="1"
          checked={checked}
          width="buttonMaxWidth"
        />
        <ShapeIcon bg="positive" color="white" size="md">
          <PaymentInfo />
        </ShapeIcon>
        <Chip onClick={() => {}} onClose={() => {}} active>
          Nhà ở
        </Chip>
        <ToggleSwitch onChange={() => setChecked(!checked)} checked={checked} />
        <Tooltip hoverable text="Tooltip">
          <Button>Tooltip</Button>
        </Tooltip>
        <TagCloud
          label="Gear box"
          required
          options={[
            { value: 'automatic', label: 'Automatic' },
            { value: 'manual', label: 'Manual' },
            { value: 'semi', label: 'Semi-automatic' },
          ]}
          value={`${value}`}
          onChange={((e: any) => setValue(e.target.value)) as any}
        />
        <Button onClick={() => setOpen(true)}>Open Snack</Button>
        {open ? (
          <Snack onClose={() => setOpen(false)} desktopSize="md">
            Medium size Snack
          </Snack>
        ) : null}
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          onPrimaryButtonClick={() => setOpen(false)}
          title="Info color"
          primaryBtnLabel="Primary"
          primaryColor="info"
          secondaryBtnLabel="Secondary"
        >
          Override default closeIcon with <code>&lt;ArrowRight /&gt;</code> icon
        </Drawer>{' '}
        <Button onClick={() => setOpen(true)}>Open Popup</Button>
        {/* <Popup
        open={open}
        img="https://cdn.chotot.com/admincentre/960_579.jpg"
        onClose={() => setOpen(false)}
        onPrimaryButtonClick={() => setOpen(false)}
        primaryBtnLabel="Primary Button"
        secondaryBtnLabel="Secondary Button"
        title="Popup title"
      >
        Multiline user message. Use \n to add line break. Popup content accepts both string and
        React components.
      </Popup> */}
      </div>

      <Slider
        value={value}
        min={0}
        max={100}
        onChange={((e: { value: number }) => setValue(e.value)) as any}
        inputField
        type="range"
      />

      <Box backgroundColor="white" color="text">
        <RowItem
          type="checkbox"
          icon={
            (
              <ShapeIcon bg="positive" color="white" radius="circle" size="md">
                <PaymentInfo />
              </ShapeIcon>
            ) as any
          }
          name="borderVar"
          value="1"
          checked={checked}
          onChange={() => setChecked(!checked)}
        >
          Row with border none
        </RowItem>
      </Box>

      <Tabs variant="fullWidth" value={0}>
        <Tab as="a" active={!!value} value={0} label="Tất cả" />
        <Tab as="a" active={!!value} value={1} label="Cá nhân" />
        <Tab as="a" active={!!value} value={2} label="Bán chuyên" />
      </Tabs>

      <Dropdown
        value={valueDropdown}
        onChange={(e) => setValueDropdown(e.target.value)}
        label="Chọn tỉnh thành"
        options={[
          { value: 'hcm', label: 'Tp Hồ Chí Minh' },
          { value: 'hn', label: 'Hà Nội' },
        ]}
      />

      <Input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value, 10))}
        label="Label cum placeholder..."
      />

      <CurrencyInput
        allowNegativeValue
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        label="Amount (VND)"
      />

      <InputGroup>
        <CurrencyInput
          allowNegativeValue
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          label="Amount"
        />
        <Dropdown
          width="quarter"
          label=""
          value={term}
          options={[
            { value: 'year', label: 'per year' },
            { value: 'month', label: 'per month' },
          ]}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button color="positive" size="large">
          <PaymentInfo />
        </Button>
      </InputGroup>

      <TextArea
        id="with-helptext"
        label="TextArea label"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        helptext="Help text"
      />

      <SearchInput
        id="si-value-binding"
        label="Search used phones on Chợ Tốt"
        variant="input"
        onInput={() => {}}
        onSelect={() => {}}
        options={valueSearch}
        value={{ text: '', selected: null as any }}
      />

      <MultiSearchDropdown
        label="Ngành nghề có sẵn"
        options={valueSearch}
        onSelect={onSelect}
        value={valueSearch}
        onClearData={onClear}
        onRemoveOption={onRemoveOption}
        onChange={() => {}}
      />

      <EmptyState buttonLabel="Comback home" type="notFound" />

      <Grid className="g1fsg0ft" gutter="none" width="full">
        <Col>
          <Box color="text" backgroundColor="background" borderWidth="sm" padding="sm">
            Column
          </Box>
        </Col>
        <Col>
          <Box color="text" backgroundColor="background" borderWidth="sm" padding="sm">
            Column
          </Box>
        </Col>
        <Col>
          <Box color="text" backgroundColor="background" borderWidth="sm" padding="sm">
            Column
          </Box>
        </Col>
      </Grid>
    </section>
  );
};

export default DetailView;
