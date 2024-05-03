import {OptionalVal, optional} from "@/utils/monad";

function isIfPresentCbCalledOnTruthy<T>(optional: OptionalVal<T>) {
  let calledFlag = false;
  optional.ifPresentThen(() => {
    calledFlag = true;
  });
  return calledFlag;
}

describe("Monad", () => {
  context("OptionalVal", () => {
    const vnull = null;
    const optionalVnull = optional(vnull);
    expect(optionalVnull.isPresent()).to.be.false;
    expect(() => optionalVnull.get()).to.throw();
    expect(isIfPresentCbCalledOnTruthy(optionalVnull)).to.be.false;

    const number = 2;
    const optionalNumber = optional(number);
    expect(optionalNumber.isPresent()).to.be.true;
    expect(optionalNumber.get()).to.be.eq(2);
    expect(isIfPresentCbCalledOnTruthy(optionalNumber)).to.be.true;
  });

  context("OptionalFn", () => {
    let fnNull: (() => void) | undefined;
    const optionalFnNull = optional(fnNull);
    expect(optionalFnNull.isPresent()).to.be.false;
    expect(optionalFnNull.call()).to.eq(undefined);

    const fn = () => 2;
    const optionalFn = optional(fn);
    expect(optionalFn.isPresent()).to.be.true;
    expect(optionalFn.call()).to.eq(2);
  });
});
