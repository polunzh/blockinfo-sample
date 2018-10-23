import TestRenderer from 'react-test-renderer';
import React from 'react';
import Summary, { BasicInfo, HashesInfo } from './Summary';

test('Summary component should contains BasicInfo and HashesInfo component', () => {
  const basicInfo = {
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

  const testSummary = TestRenderer.create(
    <Summary summary={{ ...basicInfo, ...hashes }} />
  );
  const testSummaryInstance = testSummary.root;
  expect(testSummaryInstance.findByType(BasicInfo).props.summary).toEqual(
    basicInfo
  );
  expect(testSummaryInstance.findByType(HashesInfo).props.hashesInfo).toEqual(
    hashes
  );
});
