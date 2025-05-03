if exists(select * from sys.procedures where name = 'insBusinessFocus')
begin
	drop proc insBusinessFocus;
end
go

create proc insBusinessFocus
	@description varchar(255)
as 
	set nocount on;

	if exists(select * from business_focus where [description] = @description)
	begin 
		return -1;
	end
	insert into business_focus ( 
			[description]
	)
	values (		
			@description
	);
	return 0;

go