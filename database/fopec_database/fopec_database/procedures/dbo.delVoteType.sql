if exists( select name from sys.procedures where name = 'delVoteType')
begin
	drop proc delVoteType
end
go

create proc delVoteType
		@vote_type varchar(100)
as 

	if exists (select * from crowdsourced_research_vote where vote_type = @vote_type)
	begin 
		return -1;
	end
	
	delete
	from vote_type
	where vote_type  = @vote_type
	;
	return 0;
go

