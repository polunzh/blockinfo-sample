import TestRenderer from 'react-test-renderer';
import React from 'react';
import BasicInfo, { Summary, HashesInfo } from '../../components/BasicInfo';
import { mount } from 'enzyme';

describe('#Component BasicInfo', () => {
  const summary = {
    n_tx: 20,
    fee: 10,
    height: 10,
    size: 100,
    bits: 10,
    nonce: 20,
  };

  const hashes = {
    hash: '000000000000000001806a922d4d35a37ad9324c690f72d556c6445cb7a9c214',
    prev_block:
      '000000000000000000f061205567dc79c4e718209a568879d66132e016968ac6',
    mrkl_root:
      '83f5fdf40b0b02c09ae669041df1bedfc635c45f696057a8c29e1bde1f4cbd24',
  };

  describe('#component constructor', () => {
    const testBasicInfo = TestRenderer.create(
      <BasicInfo basicInfo={{ ...summary, ...hashes }} />
    );
    const testBasicInfoInstance = testBasicInfo.root;

    test('#should contains Summary', () => {
      expect(testBasicInfoInstance.findByType(Summary).props.summary).toEqual(
        summary
      );
    });

    test('#should contains HashesInfo component', () => {
      expect(
        testBasicInfoInstance.findByType(HashesInfo).props.hashesInfo
      ).toEqual(hashes);
    });
  });

  describe('#summary sub component', () => {
    const wrapper = mount(<Summary summary={summary} />);
    test('transactions number should be rendered', () => {
      expect(
        wrapper
          .find('tr')
          .at(1)
          .find('th')
          .at(1)
          .text()
      ).toBe(summary.n_tx + '');
    });

    test('transactions fee should be rendered correctly', () => {
      expect(
        wrapper
          .find('tr')
          .at(2)
          .find('th')
          .at(1)
          .text()
      ).toBe(summary.fee * 0.00000001 + ' BTC');
    });
  });
});
