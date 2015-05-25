function I=findsubset(A, B, fc)
% findsubset - find B inside A and return corresponding indices

if ~exist('fc','var')
  fc= @isequal;
end

I=zeros(size(B));

[As Ia]=sort(A);
[Bs Ib]=sort(B);

ia=1;
for i=1:length(Bs)
  ia0=ia;
  while ia<=length(Ia) & ~feval(fc, As(ia), Bs(i)), ia=ia+1; end
  if ia<=length(Ia)
    I(Ib(i))=Ia(ia);
    ia=ia+1;
  else
    I(Ib(i))=nan;
    ia=ia0;
  end
end
