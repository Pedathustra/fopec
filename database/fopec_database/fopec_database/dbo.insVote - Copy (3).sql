if exists( select name from sys.procedures where name = 'getVoteTypes')
begin
	drop proc getVoteTypes
end
go

create proc getVoteTypes

as 
	
	select vote_type
	from vote_type
	
	;
		
go

